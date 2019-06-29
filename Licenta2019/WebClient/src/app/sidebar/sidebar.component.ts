import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Router, NavigationStart } from '@angular/router';
import { CourseService } from '../course/course.service';

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
  yearTitles: string[] = ["First Year", "Second Year", "Third Year"];
  studentYear: string[] = ["1st", "2nd", "3rd"];
  courses: any[];

  constructor(
    protected sidebarService: SidebarService,
    protected router: Router,
    protected courseService: CourseService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    if (this.userInformation) {
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
          if (this.urlParsed[1] == 'home' || this.urlParsed[1] == 'login' || this.urlParsed[1] == 'register' || this.urlParsed[1] == '') {
            this.showSidebar = false;
          }

          if(this.urlParsed.length > 2 && this.urlParsed[1] == 'admin' && (this.urlParsed[2] == 'home' || this.urlParsed[2] == 'login' || this.urlParsed[2] == 'register' || this.urlParsed[2] == '')){
            this.showSidebar = false;
          }

          this.courseService.getUserCourses(this.userInformation.id).subscribe((data: any) => {
            this.courses = data;
            this.courses.forEach(element => {
              var words = element.name.split(" ");
              var courseAbreviation = '';
              words.forEach(element => {
                if (element.length > 3) {
                  courseAbreviation += element[0];
                }
              });
              element.abreviation = courseAbreviation.toUpperCase();
            });
          });
        }
      });
    }

      this.courseService.getUserCourses(this.userInformation.id).subscribe((data: any) => {
        this.courses = data;
        this.courses.forEach(element => {
          var words = element.name.split(" ");
          var courseAbreviation = '';
          words.forEach(element => {
            if (element.length > 3) {
              courseAbreviation += element[0];
            }
          });
          element.abreviation = courseAbreviation.toUpperCase();
        });
      });
    };
  }