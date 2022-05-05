import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ {path: 'panierroute', component: PanierComponent}])
  ]
})
export class PanierModule { }
