import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course/course.service';
import { ActivatedRoute } from '@angular/router';

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
  coursesLoaded: boolean;
  coursesShowed: any[] = [];
  button: boolean;
  
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.button = this.route.snapshot.url.length > 2;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.year = 1;
    this.courseService.getUserCourses(this.userInformation.id).subscribe((data: any) => {
      this.courses = data;
      this.coursesLoaded = true;
      this.courses.forEach(element => {
        if(element.year == this.year)
        {
          this.coursesShowed.push(element);
        }
      });
    })
  }

  selectYear(year: any) {
    this.year = year;
    this.coursesShowed = [];
    this.courses.forEach(element => {
      if(element.year == this.year)
      {
        this.coursesShowed.push(element);
      }
    });
  }
}
