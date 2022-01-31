import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DescriptionComponent } from '../description/description/description.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([ {path: 'catalogueroute', component: CatalogueComponent}, {path: ':id', component: DescriptionComponent}])
    ]
})
export class CatalogueModule { }
