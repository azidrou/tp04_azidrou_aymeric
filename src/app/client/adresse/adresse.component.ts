import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddAdresse, SubAdresse } from 'shared/action/adresse.action';
import { Adresse } from "shared/model/adresse";
import { AdresseState } from 'shared/state/adresse.state';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css']
})
export class AdresseComponent implements OnInit {
  @Input() name: String = "default";

  constructor(public store: Store) { }
  @Select(AdresseState.countAdresses) nbAdresse$ : Observable<number>;
  @Select(AdresseState.getAdresses) getAdresse$ : Observable<Adresse[]>;

  ngOnInit(): void {
  }

  profileForme = new FormGroup({
    firstName: new FormControl(''),
    name: new FormControl(''),
    adress: new FormControl(''),
      cp: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      civility: new FormControl(''),
      login: new FormControl(''),
      //confirmPassword: new FormControl(''),
      password: new FormControl('')
    
  });

  isValid:boolean=false;

  submitForm(){
    this.isValid = this.profileForme.valid;
  }
  addToAdresse(){
    let adresse: Adresse = {
      adress : this.profileForme.get('adress').value, 
      city : this.profileForme.get('city').value, 
      cp:this.profileForme.get('cp').value, 
      country: this.profileForme.get('country').value
    }
    this.store.dispatch(new AddAdresse(adresse));
    //console.log(adresse);
  }
  subToAdresse(adresse: Adresse){
    this.store.dispatch(new SubAdresse(adresse));
  }


/*
  $( "form" ).submit(function( event ) {
    if ( $( "password" ) !== $( "confirmpassword" ) ) {
      $( "span" ).text( "Mot de passe validés" ).show();
      return;
    }
  });
  */
}
