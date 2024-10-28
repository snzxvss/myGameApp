import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasosClinicosComponent } from './casos-clinicos/casos-clinicos.component';

const routes: Routes = [
  {
    path: '',
    component: CasosClinicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasosClinicosRoutingModule {}