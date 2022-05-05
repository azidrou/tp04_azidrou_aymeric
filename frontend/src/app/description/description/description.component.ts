import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from 'shared/model/produit';
import { AddPanier, SubPanier } from 'shared/action/produit.action';
import { map, Observable } from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router'
import { MyserviceService } from 'src/app/myservice.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(private serviceCata: MyserviceService, public store : Store, public route: ActivatedRoute) { }
  descriptionProduit$: Observable<Produit[]> = new Observable;
  id: number =0;

  AddToBasket(p: Produit):void{
    this.store.dispatch(new AddPanier(p));
    //console.log('test');
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap)=>{
    this.id = +params.get('id');
    this.descriptionProduit$ = this.serviceCata.getCatalogue()
                          .pipe(
                            map(produits => produits.filter((p, index)=> index == this.id)
                          ))
  })
}

}
