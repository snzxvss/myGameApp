import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() avatarUrl: string = 'assets/avatar1.jpg';
  @Output() avatarChange = new EventEmitter<string>();
  private avatarIndex: number = 1;
  private readonly totalAvatars: number = 7;

  changeAvatar() {
    this.avatarIndex = (this.avatarIndex % this.totalAvatars) + 1;
    this.avatarUrl = `assets/avatar${this.avatarIndex}.jpg`;
    this.avatarChange.emit(this.avatarUrl);
  }
}