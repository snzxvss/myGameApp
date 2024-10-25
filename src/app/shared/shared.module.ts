import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from '../avatar/avatar.component';

@NgModule({
  declarations: [AvatarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AvatarComponent]
})
export class SharedModule {}