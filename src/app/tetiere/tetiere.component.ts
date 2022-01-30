import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from 'shared/state/produit.state';


@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {

  constructor() { }

  @Select(PanierState.countProduits) countProduits$ : Observable<number>;

  ngOnInit(): void {
  }

}
