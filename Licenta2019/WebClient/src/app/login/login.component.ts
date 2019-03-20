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
  }

  onSubmit(){
    this.userInformation.Email = this.email;
    this.userInformation.Password = this.password;
    this.signUpService.login(this.userInformation).subscribe((data: any) => {
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userInfo", JSON.stringify(data));
      this.router.navigate(["/profile"]);
    });
  }

}
