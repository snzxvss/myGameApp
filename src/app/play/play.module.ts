import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayPageRoutingModule } from './play-routing.module';
import { PlayPage } from './play.page';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [PlayPage]
})
export class PlayPageModule {}