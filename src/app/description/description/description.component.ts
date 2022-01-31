import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from 'shared/model/produit';
import { AddPanier, SubPanier } from 'shared/action/produit.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(public store : Store) { }
  descriptionProduit$: Observable<Produit[]> = new Observable;

  AddToBasket(p: Produit):void{
    this.store.dispatch(new AddPanier(p));
    //console.log('test');
}

  ngOnInit(): void {
  }

}
