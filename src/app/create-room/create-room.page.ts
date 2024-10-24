import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
  players: { avatarUrl: string, nickname: string, score: number, isCreator?: boolean }[] = [];
  emptySlots: number[] = [];
  roomId: string | null = null;
  isCreator: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
      if (!this.roomId) {
        this.roomId = localStorage.getItem('roomId');
      }
      if (this.roomId) {
        this.loadPlayers();
        this.updateEmptySlots();
        this.listenForUpdates();
        this.checkIfCreator();
      } else {
        console.error('No se encontró roomId');
        this.router.navigate(['/home']);
      }
    });
  }

  loadPlayers() {
    const players = JSON.parse(localStorage.getItem(`players_${this.roomId}`) || '[]');
    this.players = players;
  }

  updateEmptySlots() {
    this.emptySlots = Array(6 - this.players.length).fill(0);
  }

  startGame() {
    if (!this.isCreator) {
      console.error('Solo el creador de la sala puede iniciar el juego');
      return;
    }

    // Reiniciar el estado del juego
    localStorage.setItem('gameState', JSON.stringify({
      preguntas: [],
      respuestas: [],
      currentQuestionIndex: 0,
      score: 0,
      minutes: 5,
      seconds: 0
    }));

    // Enviar mensaje al servidor WebSocket para iniciar el juego
    this.wsService.sendMessage({
      type: 'start',
      roomId: this.roomId,
    });

    console.log('Iniciar partida');
    this.router.navigate(['/play']);
  }

  invitePlayer() {
    if (!this.roomId) {
      console.error('No se encontró roomId');
      return;
    }

    const baseUrl = window.location.origin; // Obtener la URL base (e.g., http://localhost:4200)
    const inviteUrl = `${baseUrl}/join-room/${this.roomId}`;

    console.log('Invitar jugador');
    console.log(`URL de invitación: ${inviteUrl}`);
  }

  addPlayer(player: { avatarUrl: string, nickname: string }) {
    const existingPlayers = JSON.parse(localStorage.getItem(`players_${this.roomId}`) || '[]');
    existingPlayers.push({ ...player, score: 0 });
    localStorage.setItem(`players_${this.roomId}`, JSON.stringify(existingPlayers));
    this.players = existingPlayers;
    this.updateEmptySlots();
    this.wsService.sendMessage({
      type: 'join',
      roomId: this.roomId,
      player,
    });
  }

  listenForUpdates() {
    this.wsService.getMessages().subscribe((message) => {
      if (message.roomId === this.roomId) {
        if (message.type === 'update') {
          this.players = message.players;
          this.updateEmptySlots();
        } else if (message.type === 'start') {
          console.log('Iniciar partida');
          this.router.navigate(['/play']);
        }
      }
    });
  }

  checkIfCreator() {
    const nickname = localStorage.getItem('nickname');
    const player = this.players.find(p => p.nickname === nickname);
    if (player && player.isCreator) {
      this.isCreator = true;
    }
  }
}