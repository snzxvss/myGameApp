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

  createRoom() {
    // Guarda el usuario y el avatar en el localStorage
    localStorage.setItem('nickname', this.nickname);
    localStorage.setItem('avatarUrl', this.avatarUrl);

    // Redirige a la página de la sala
    this.router.navigate(['/create-room']);
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }
}