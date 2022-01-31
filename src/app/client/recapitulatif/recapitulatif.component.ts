import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SubAdresse } from 'shared/action/adresse.action';
import { Adresse } from 'shared/model/adresse';
import { AdresseState } from 'shared/state/adresse.state';


@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {

  constructor(public store: Store) { }

  @Select(AdresseState.getAdresses) getAdresse$ : Observable<Adresse[]>;

  subToAdresse(adresse: Adresse){
    this.store.dispatch(new SubAdresse(adresse));
  }

  ngOnInit(): void {
  }

  @Input() firstName: string="";
  @Input() name: string ="";
  @Input() adress: string ="";
  @Input() cp: string ="";
  @Input() city:string="";
  @Input() country:string="";
  @Input() phone: string="";
  @Input() email: string="";
  @Input() civility: string="";
  @Input() login: string="";
  @Input() password: string="";


}
