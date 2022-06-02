import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AdresseComponent } from './adresse/adresse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([ {path: 'formulaireroute', component: AdresseComponent}, {path: 'loginroute', component: LoginComponent}, { path: 'signuproute', component: SignupComponent}])
  ]
})
export class ClientModule { }
