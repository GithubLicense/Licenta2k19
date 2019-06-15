import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup/signup.service';
import { UserLogin } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userInformation: UserLogin = new UserLogin();

  constructor(
    protected signUpService: SignupService,
    private router: Router
    ) { }

  ngOnInit() {
    console.log('onInit');
  }

  onSubmit(){
    window.localStorage.clear();
    this.userInformation.Email = this.email;
    this.userInformation.Password = this.password;
    console.log(this.userInformation);
    this.signUpService.login(this.userInformation).subscribe((data: any) => {
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userInfo", JSON.stringify(data));
      if(data.userPosition == 0)
      {
        this.router.navigate(["year/1/profile"]);
      }
      else
      {
        this.router.navigate(["profile"]);
      }
    });
  }

}
