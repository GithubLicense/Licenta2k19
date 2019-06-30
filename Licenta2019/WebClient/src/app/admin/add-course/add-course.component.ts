import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  name:string;
  year:string;
  semester:string;
  description:string;
  course: Course = new Course();
  courseId: any;
  courseInformation: any;
  semesters: string[] = ['1', '2'];
  
  constructor(
    private service: AdminService,
    private router: Router,
    private toaster: MatSnackBar
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.course.Name = this.name;
    this.course.Year = this.year;
    this.course.Semester = this.semester;
    this.course.Description = this.description;
    this.service.addCourse(this.course).subscribe((data) => {
      this.toaster.open("The course has been successfully added!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(["/admin","profile"]);
    })
  }
}
