// src/app/join-room/join-room.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JoinRoomPageRoutingModule } from './join-room-routing.module';
import { JoinRoomPage } from './join-room.page';
import { SharedModule } from '../shared/shared.module'; // Import the SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinRoomPageRoutingModule,
    SharedModule // Add SharedModule here
  ],
  declarations: [JoinRoomPage]
})
export class JoinRoomPageModule {}