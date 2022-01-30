import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { SaisieClientComponent } from '../saisie-client/saisie-client.component';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ {path: 'accueilroute', component: AccueilComponent},{path: 'loginroute', component: LoginComponent}, { path: 'signuproute', component: SignupComponent}])
  ]
})
export class ClientModule { }
