import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  userInformation: User = new User();

  constructor(
    protected signUpService: SignupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userInformation.Email = this.email;
    this.userInformation.Password = this.password;
    this.signUpService.signUp(this.userInformation).subscribe((data: any) => {
      this.router.navigate(["/login"]);
    });
  }

}
