import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../myservice.service';
import { Observable } from 'rxjs';
import { Produit } from '../../../../shared/model/produit';
import { map, filter } from 'rxjs/operators';
import { Select, Selector, Store } from '@ngxs/store';
import { PanierState } from 'shared/state/produit.state';
import { AddPanier, SubPanier } from 'shared/action/produit.action';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private service1: MyserviceService, private store: Store) { 
    //this.countProduits$ = this.store.select(PanierState.countProduits);
  }

  count: number = 0;
  funLevel: string ="Zéro fun";
  obsCatalogue: Observable<Produit[]> = new Observable;
  recherche: string='';
  //countProduits$ : Observable<number>;

  @Select(PanierState.countProduits) countProduits$ : Observable<number>;
  AddToBasket(p: Produit):void{
      this.store.dispatch(new AddPanier(p));
      //console.log('test');
  }
  /*
  SubToBasket(p: Produit){
    return this.store.dispatch(new SubPanier(p));
  }
  */
  
  valuechange(event : any){
    if(Number(this.recherche)){
    this.obsCatalogue = this.service1.getCatalogue()
    .pipe(
      map(
        produit => 
            produit.filter(
              //produit => produit.prix.toString().startsWith(this.recherche.toString()))
              produit => produit.prix <= Number(this.recherche))
      ))
    }else{
      this.obsCatalogue = this.service1.getCatalogue()
      .pipe(
        map(
          produit => 
            produit.filter(
              produit => produit.libelle.startsWith(this.recherche))
        ))
    }
  }

  
 
  ngOnInit(): void {
    this.obsCatalogue = this.service1.getCatalogue();
   }

  getCount(): void {
    this.count = this.service1.getCount();
  }

  funOuPasFun(counter: number){
    if(this.count >= 104){
      this.funLevel="iksedé chapeauchapeau";
    }
    else if(this.count >= 103 && this.count < 104){
      this.funLevel="xd ^^";
    }
    else if(this.count >= 100 && this.count < 103){
      this.funLevel="Mais c'est SUPER fun ça !";
    }
    else if(this.count > 10 && this.count < 20){
      this.funLevel="Un petit effort sur le fun svp";
    }
    else if(this.count > 40 && this.count < 50){
      this.funLevel="Tu ne connais rien au fun";
    }
    else if(this.count > 70 && this.count < 80){
      this.funLevel="T'es pas fun";
    }
    else if(this.count > 0 && this.count < 100){
      this.funLevel="C'est pas très fun";
    }
    else if(this.count < 0){
      this.funLevel="Monstre !!";
    }
  }
  resetFun(){
    this.service1.count = -2;
  }

}
