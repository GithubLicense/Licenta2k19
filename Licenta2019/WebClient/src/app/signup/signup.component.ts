import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  first_name: string;
  last_name: string;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.first_name);
  }

}
