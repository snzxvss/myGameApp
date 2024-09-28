import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
  players: { avatarUrl: string, nickname: string }[] = [];
  emptySlots: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const nickname = localStorage.getItem('nickname');
    const avatarUrl = localStorage.getItem('avatarUrl');

    if (nickname && avatarUrl) {
      this.players.push({ avatarUrl, nickname });
    }

    this.updateEmptySlots();
  }

  updateEmptySlots() {
    this.emptySlots = Array(6 - this.players.length).fill(0);
  }

  startGame() {
    // Lógica para iniciar la partida
    console.log('Iniciar partida');
  }

  invitePlayer() {
    // Lógica para invitar a un jugador
    console.log('Invitar jugador');
  }
}