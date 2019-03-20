import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userInformation: any;
  showObject: boolean;

  constructor() { }

  ngOnInit() {
    this.showObject = false;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
  }

  showObjects(){
    this.showObject = !this.showObject;
  }

}
