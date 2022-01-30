import { Component, OnInit } from '@angular/core';
import { Store, State, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SubPanier } from 'shared/action/produit.action';
import {Produit} from 'shared/model/produit';
import { PanierState } from 'shared/state/produit.state';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(public store: Store) {}
 

  @Select(PanierState.getProduits) produits$ : Observable<Produit[]>

  /*
  public prixTotal: number =0;
  public nbTotal: number =0;
  */

  SubToBasket(p: Produit):void{
    this.store.dispatch(new SubPanier(p));
  }

  ngOnInit(): void {
  }
}

