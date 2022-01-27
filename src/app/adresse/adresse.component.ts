import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css']
})
export class AdresseComponent implements OnInit {
  @Input() name: String = "default";

  constructor() { }

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

/*
  $( "form" ).submit(function( event ) {
    if ( $( "password" ) !== $( "confirmpassword" ) ) {
      $( "span" ).text( "Mot de passe validés" ).show();
      return;
    }
  });
  */
}
