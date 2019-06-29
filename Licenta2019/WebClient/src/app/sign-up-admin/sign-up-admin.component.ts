import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup/signup.service';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.scss']
})
export class SignUpAdminComponent implements OnInit {

  email: string;
  password: string;
  userInformation: any = {};
  firstName: string;
  lastName: string;
  
  constructor(
    protected signUpService: SignupService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userInformation.FirstName = this.firstName;
    this.userInformation.LastName = this.lastName;
    this.userInformation.Email = this.email;
    this.userInformation.Password = this.password;
    this.signUpService.signUpAdmin(this.userInformation).subscribe((data: any) => {
       this.router.navigate(['/admin', 'login']);
     });
  }

}
