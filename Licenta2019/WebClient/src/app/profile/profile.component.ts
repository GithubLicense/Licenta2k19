import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course/course.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showButton: boolean;
  year: any;
  userInformation: any;
  courses: any;
  coursesLoaded: boolean = false;
  coursesShowed: any[] = [];
  button: boolean;
  urlParsed: string[];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.year = this.route.snapshot.params.year;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.urlParsed = val.url.split('/');
        this.year = this.urlParsed[2];
        this.button = this.urlParsed.length > 4;
      }

      this.coursesShowed = [];
      this.courses.forEach(element => {
        if (element.year == this.year) {
          this.coursesShowed.push(element);
        }
      });
    });

    this.courseService.getUserCourses(this.userInformation.id).subscribe((data: any) => {
      this.courses = data;
      this.coursesLoaded = true;
      this.coursesShowed = [];
      this.courses.forEach(element => {
        if (element.year == this.year) {
          this.coursesShowed.push(element);
        }
      });
    })
  }
}

