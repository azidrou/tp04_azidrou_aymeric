import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  registerException1 = /[A-Za-z]{2,40}/;
  registerException2 = /[A-Za-z0-9]{2,40}/;
  //registerException3 = 

}
