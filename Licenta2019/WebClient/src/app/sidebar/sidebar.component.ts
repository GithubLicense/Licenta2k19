import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userInformation: any;
  userYears: number[] = [];
  showYearCourses: boolean[] = [];
  urlParsed: string[];
  showSidebar: boolean = false;

  constructor(
    protected sidebarService: SidebarService,
    protected router: Router
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        var user = window.localStorage.getItem("userInfo");
        this.userInformation = JSON.parse(user);
        this.userYears = [];
        for (var i = 0; i < this.userInformation.year; i++) {
          this.userYears[i] = i + 1;
          this.showYearCourses[i] = false;
        }
        this.showSidebar = true;
        this.urlParsed = val.url.split('/');
        if(this.urlParsed[1] == 'home' || this.urlParsed[1] == 'login' || this.urlParsed[1] == 'register' || this.urlParsed[1] == ''){
          this.showSidebar = false;
        }
      }
    });

  }
}
