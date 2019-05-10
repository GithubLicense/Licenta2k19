import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  courseInformation: string;
  course: any;
  courseAbreviation: string = "";
  constructor(
    private route: ActivatedRoute,
    private service: CourseService
  ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.service.getCourseById(this.courseInformation).subscribe((data: any) => {
      this.course = data;
      console.log(this.course);
      var words = this.course.name.split(" ");
    words.forEach(element => {
      if(element.length > 3){
        this.courseAbreviation += element[0];
      }
    });
    this.courseAbreviation = this.courseAbreviation.toUpperCase();
    })
  }

}
