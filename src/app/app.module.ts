import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SaisieClientComponent } from './saisie-client/saisie-client.component';
import { FormsModule } from '@angular/forms';
import { AdresseComponent } from './adresse/adresse.component';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { RecapitulatifComponent } from './recapitulatif/recapitulatif.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationFormulaireDirective } from './verification-formulaire.directive';
import { PhoneNumberPipe } from './phone-number.pipe';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { TotemComponent } from './totem/totem.component';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    AppComponent,
    SaisieClientComponent,
    AdresseComponent,
    FooterComponent,
    TetiereComponent,
    RecapitulatifComponent,
    VerificationFormulaireDirective,
    PhoneNumberPipe,
    CatalogueComponent,
    TotemComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot(),
    //RouterModule.forRoot([ {path: 'myroute0', component: SaisieClientComponent}, { path: 'myroute', component: CatalogueComponent }])
    RouterModule.forRoot([
    {path: 'myroute0', component: SaisieClientComponent}, 
    {path: 'myroute', component: CatalogueComponent }, 
    {path: 'mylazyroute0', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }, 
    {path: '**', redirectTo: 'myroute0', pathMatch: 'full'}])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
