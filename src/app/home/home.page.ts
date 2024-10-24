import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  avatarUrl: string = 'assets/avatar1.jpg';
  nickname: string = '';
  isInputFocused: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onAvatarChange(newAvatarUrl: string) {
    this.avatarUrl = newAvatarUrl;
  }

  generateRoomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  createRoom() {
    // Guarda el usuario y el avatar en el localStorage
    localStorage.setItem('nickname', this.nickname);
    localStorage.setItem('avatarUrl', this.avatarUrl);

    // Genera y guarda el roomId en el localStorage
    const roomId = this.generateRoomId();
    localStorage.setItem('roomId', roomId);

    // Agrega al creador de la sala a la lista de jugadores
    const players = [{ avatarUrl: this.avatarUrl, nickname: this.nickname, isCreator: true }];
    localStorage.setItem(`players_${roomId}`, JSON.stringify(players));

    // Redirige a la página de la sala con el roomId
    this.router.navigate([`/create-room/${roomId}`]);
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }
}