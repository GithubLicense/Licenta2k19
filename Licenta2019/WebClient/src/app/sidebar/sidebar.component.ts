import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userInformation: any;
  showObject: boolean;
  coursesLoaded: boolean = false;
  courses: any;
  userYears: number[] = [];
  showYearCourses: boolean[] = [];

  constructor(
    protected sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.showObject = false;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);

    for (var i = 0; i < this.userInformation.year; i++) {
      this.userYears[i] = i + 1;
      this.showYearCourses[i] = false;
    }

    this.sidebarService.getUserCourses(this.userInformation.id).subscribe((data: any) => {
      this.courses = data;
      this.coursesLoaded = true;
    })
  }

  showObjects(year: number) {
    for (var i = 0; i < this.userInformation.year; i++) {
      if (year - 1 == i) {
        this.showYearCourses[i] = !this.showYearCourses[i];
      }
      else {
        this.showYearCourses[i] = false;
      }
    }
  }

}
