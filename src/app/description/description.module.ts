import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { RouterModule } from '@angular/router';
import { AddPanier, SubPanier } from 'shared/action/produit.action';


@NgModule({
  declarations: [
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ {path: 'descriptionroute', component: DescriptionComponent}])
  ]
})
export class DescriptionModule { }
