import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { CourseService } from '../course.service';
import { AddProjectService } from '../../projects/add-project/add-project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  courseInformation: string;
  course: any;
  courseAbreviation: string = '';
  urlSplitted: string[];
  teachers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: CourseService,
    private router: Router,
    private teacherService: UserService
  ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.teacherService.getCourseTeachers(this.courseInformation).subscribe((data: any) => {
      this.teachers = data;
    })

    this.service.getCourseById(this.courseInformation).subscribe((data: any) => {
      this.course = data;
      console.log(this.course);
      var words = this.course.name.split(" ");
      words.forEach(element => {
        if (element.length > 3) {
          this.courseAbreviation += element[0];
        }
      });
      this.courseAbreviation = this.courseAbreviation.toUpperCase();
    })

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.courseAbreviation = '';
        console.log(val.url);
        this.urlSplitted = val.url.split('/');
        for(let i=0; i<this.urlSplitted.length; i++){
          if(this.urlSplitted[i] == 'profile'){
            if(this.urlSplitted[i+1]){
              this.courseInformation = this.urlSplitted[i+1];
            }
          }
        }
        this.service.getCourseById(this.courseInformation).subscribe((data: any) => {
          this.course = data;
          console.log(this.course);
          var words = this.course.name.split(" ");
          words.forEach(element => {
            if (element.length > 3) {
              this.courseAbreviation += element[0];
            }
          });
          this.courseAbreviation = this.courseAbreviation.toUpperCase();
        })
      }
    });
  }


}
