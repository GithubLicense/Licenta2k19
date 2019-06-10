import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  
  @Input() course: any;
  courseAbreviation: string = "";
  yearsTitle: string[] = ["First Year", "Second Year", "Third Year"];
  semestersTitle: string[] = ["First Semester", "Second Semester"];

  constructor() { }

  ngOnInit() {
    var words = this.course.name.split(" ");
    words.forEach(element => {
      if(element.length > 3){
        this.courseAbreviation += element[0];
      }
    });
    this.courseAbreviation = this.courseAbreviation.toUpperCase();
  }

}
