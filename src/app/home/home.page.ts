import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  avatarUrl: string = 'assets/avatar1.jpg';
  nickname: string = '';

  constructor(private router: Router) {}

  onAvatarChange(newAvatarUrl: string) {
    this.avatarUrl = newAvatarUrl;
  }

  createRoom() {
    // Guarda el usuario y el avatar en el localStorage
    localStorage.setItem('nickname', this.nickname);
    localStorage.setItem('avatarUrl', this.avatarUrl);

    // Redirige a la página de play
    this.router.navigate(['/create-room']);
  }
}