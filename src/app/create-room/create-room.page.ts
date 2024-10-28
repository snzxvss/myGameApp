import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
  roomId: string = '';
  players: any[] = [];
  emptySlots: number[] = [];
  isCreator: boolean = false;

  constructor(private router: Router, private wsService: WebSocketService) {}

  ngOnInit() {
    this.roomId = localStorage.getItem('roomId') || '';
    this.players = JSON.parse(localStorage.getItem(`players_${this.roomId}`) || '[]');
    this.isCreator = this.players.some(player => player.isCreator && player.nickname === localStorage.getItem('nickname'));
    this.updateEmptySlots();
  }

  updateEmptySlots() {
    const maxPlayers = 4;
    this.emptySlots = Array(maxPlayers - this.players.length).fill(0);
  }

  startGame() {
    if (!this.isCreator) {
      console.error('Solo el creador de la sala puede iniciar el juego');
      return;
    }

    // Reiniciar el estado del juego
    localStorage.setItem('gameState', JSON.stringify({
      respuestas: [],
      currentQuestionIndex: 0,
      score: 0,
      minutes: 5,
      seconds: 0
    }));

    // Reiniciar los puntajes de los jugadores
    this.players = this.players.map(player => ({ ...player, score: 0 }));
    localStorage.setItem(`players_${this.roomId}`, JSON.stringify(this.players));

    // Limpiar cualquier estado anterior del juego
    localStorage.removeItem('gameState');

    // Enviar mensaje al servidor WebSocket para iniciar el juego
    this.wsService.sendMessage({
      type: 'start',
      roomId: this.roomId,
    });

    console.log('Iniciar partida');
    this.router.navigate(['/play']);
  }

  invitePlayer() {
    // Implementación para invitar a un jugador
  }
}