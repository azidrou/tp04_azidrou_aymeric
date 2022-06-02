import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service1: MyserviceService) { }

  ngOnInit(): void {
  }

  regEx = /[A-Za-z0-9]{2,40}/;
  
  signupForm = new FormGroup({
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
      confirm_password: new FormControl(''),
      password: new FormControl('')
    
  });

  isValid:boolean=false;
  submitForm(){
    this.isValid = this.signupForm.valid;
    console.log("postClient1 isValid : ", this.isValid);
    if(this.isValid)
    {
      this.service1.postClient(this.signupForm.value.firstName, this.signupForm.value.name, this.signupForm.value.adress, this.signupForm.value.cp, this.signupForm.value.city, this.signupForm.value.country, this.signupForm.value.phone, this.signupForm.value.email, this.signupForm.value.civility, this.signupForm.value.login, this.signupForm.value.password).subscribe();
      console.log("postClient2 isValid : ", this.isValid);
    }
  }
}
