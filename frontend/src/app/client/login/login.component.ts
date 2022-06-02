import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service1: MyserviceService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
  });

  isValid:boolean=false;
  submitForm(){
    this.isValid = this.loginForm.valid;

    if(this.isValid)
    {
      this.service1.postLogin(this.loginForm.value.login, this.loginForm.value.password).subscribe();
      console.log("postLogin2 isValid : ", this.isValid);
    }
  }

  public signin(login : string, password : string) : void {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    this.service1.postLogin(this.loginForm.value.login, this.loginForm.value.password).subscribe();
  }

}
