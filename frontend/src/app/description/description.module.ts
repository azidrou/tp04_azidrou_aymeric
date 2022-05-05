import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { RouterModule } from '@angular/router';



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
