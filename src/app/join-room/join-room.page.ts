import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

interface Player {
  avatarUrl: string;
  nickname: string;
  score: number;
  isCreator?: boolean;
}

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {
  roomId: string | null = null;
  nickname: string = '';
  avatarUrl: string = 'assets/avatar1.jpg';
  isInputFocused: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
      if (!this.roomId) {
        console.error('No se encontró roomId en la URL');
        this.router.navigate(['/home']);
      } else {
        this.requestPlayers();
      }
    });

    this.wsService.getMessages().subscribe((message) => {
      if (message.roomId === this.roomId && message.type === 'update') {
        localStorage.setItem(`players_${this.roomId}`, JSON.stringify(message.players));
      }
    });
  }

  joinRoom() {
    if (!this.nickname) {
      console.error('El nickname es obligatorio');
      return;
    }

    // Guarda el usuario y el avatar en el localStorage
    localStorage.setItem('nickname', this.nickname);
    localStorage.setItem('avatarUrl', this.avatarUrl);

    // Agrega el jugador a la lista de jugadores si no existe
    const existingPlayers: Player[] = JSON.parse(localStorage.getItem(`players_${this.roomId}`) || '[]');
    const playerExists = existingPlayers.some(player => player.nickname === this.nickname);

    if (!playerExists) {
      const newPlayer: Player = { avatarUrl: this.avatarUrl, nickname: this.nickname, score: 0 };
      existingPlayers.push(newPlayer);
      localStorage.setItem(`players_${this.roomId}`, JSON.stringify(existingPlayers));

      // Enviar mensaje al servidor WebSocket
      this.wsService.sendMessage({
        type: 'join',
        roomId: this.roomId,
        player: newPlayer,
      });
    }

    // Redirige a la página de la sala con el roomId
    this.router.navigate([`/create-room/${this.roomId}`]);
  }

  onAvatarChange(newAvatarUrl: string) {
    this.avatarUrl = newAvatarUrl;
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }

  requestPlayers() {
    this.wsService.sendMessage({
      type: 'requestPlayers',
      roomId: this.roomId,
    });
  }
}