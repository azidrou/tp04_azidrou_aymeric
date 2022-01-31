import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SaisieClientComponent } from './saisie-client/saisie-client.component';
import { FormsModule } from '@angular/forms';
import { AdresseComponent } from './client/adresse/adresse.component';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { RecapitulatifComponent } from './client/recapitulatif/recapitulatif.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationFormulaireDirective } from './verification-formulaire.directive';
import { PhoneNumberPipe } from './phone-number.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { TotemComponent } from './totem/totem.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from 'shared/state/produit.state';
import { AdresseState } from 'shared/state/adresse.state';
import { AccueilComponent } from './accueil/accueil.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { DescriptionComponent } from './description/description/description.component';


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
    NgxsModule.forRoot([PanierState, AdresseState]), // NE PAS OUBLIER CETTE LIGNE
    RouterModule.forRoot([
    {path: 'mydefaultroute', component: AccueilComponent}, 
    {path: 'myroute0', component: SaisieClientComponent}, 
    {path: 'myroute', component: CatalogueComponent }, 
    {path: 'mylazyrouteClient', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
    {path: 'mylazyroutePanier', loadChildren: () => import('./panier/panier.module').then(m => m.PanierModule) }, 
    {path: 'mylazyrouteCatalogue', loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule) }, 
    {path: 'mylazyrouteDescription', loadChildren: () => import('./description/description.module').then(m => m.DescriptionModule) },
    {path: 'catalogue/:id', component: DescriptionComponent},
    {path: '**', redirectTo: 'mydefaultroute', pathMatch: 'full'}])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
