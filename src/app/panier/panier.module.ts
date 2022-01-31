import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SubPanier, AddPanier } from 'shared/action/produit.action';

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
