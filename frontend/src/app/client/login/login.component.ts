import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
  });

  isValid:boolean=false;
  submitForm(){
    this.isValid = this.loginForm.valid;
  }
/*
  public signin(login : string, password : string) : void {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    this.httpClient.post<any>(environment.signin,{login, password},httpOptions);  
  }
*/
}
