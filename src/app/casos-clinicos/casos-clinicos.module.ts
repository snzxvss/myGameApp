import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { CasosClinicosRoutingModule } from './casos-clinicos-routing.module';
import { CasosClinicosComponent } from './casos-clinicos/casos-clinicos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule, // Asegúrate de que HttpClientModule esté importado aquí
    CasosClinicosRoutingModule
  ],
  declarations: [CasosClinicosComponent]
})
export class CasosClinicosModule {}