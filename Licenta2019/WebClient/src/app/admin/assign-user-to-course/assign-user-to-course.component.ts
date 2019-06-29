import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export class CourseManagement {
  courseId: string;
  userId: string;
}

@Component({
  selector: 'app-assign-user-to-course',
  templateUrl: './assign-user-to-course.component.html',
  styleUrls: ['./assign-user-to-course.component.scss']
})
export class AssignUserToCourseComponent implements OnInit {

  assignUser: FormGroup;
  courses: any[] = [];
  users: any[] = [];
  coursesDisplayed: any[] = [];
  usersDisplayed: any[] = [];
  courseManagement: CourseManagement;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private toaster: MatSnackBar
  ) { }

  ngOnInit() {
    this.assignUser = this.fb.group({
      courses: ['', Validators.required],
      users: ['', Validators.required],
      searchForUser: [''],
      searchForCourse: ['']
    });

    this.service.getCourses().subscribe(data => {
      this.courses = data;
      this.courses.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.coursesDisplayed = this.courses;
    });

    this.service.getUsers().subscribe(data => {
      this.users = data;
      this.users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
      this.usersDisplayed = this.users;
    })

    this.onChanges();
  }

  onChanges(): void {
    this.assignUser.get('searchForUser').valueChanges.subscribe(val => {
      if (val) {
        this.usersDisplayed = [];
        this.users.forEach(element => {
          if (element.firstName.toLowerCase().search(val.toLowerCase()) != -1 || element.lastName.toLowerCase().search(val.toLowerCase()) != -1){
            this.usersDisplayed.push(element);
            this.cd.detectChanges();
          }
      });

        if(this.usersDisplayed.length == 1){
          this.assignUser.controls['users'].setValue(this.usersDisplayed[0].id);
        }
      }
      else
      {
        this.usersDisplayed = this.users;
        this.cd.detectChanges();
      }
    });

    this.assignUser.get('searchForCourse').valueChanges.subscribe(val => {
      if (val) {
        this.coursesDisplayed = [];
        this.courses.forEach(element => {
          if (element.name.toLowerCase().search(val.toLowerCase()) != -1){
            this.coursesDisplayed.push(element);
            this.cd.detectChanges();
          }
      });
        if(this.coursesDisplayed.length == 1){
          this.assignUser.controls['courses'].setValue(this.coursesDisplayed[0].id);
        }
      }
      else
      {
        this.coursesDisplayed = this.courses;
        this.cd.detectChanges();
      }
    });
  }

  onSubmit() {
    this.courseManagement = new CourseManagement();
    this.courseManagement.courseId = this.assignUser.controls['courses'].value;
    this.courseManagement.userId = this.assignUser.controls['users'].value;
    this.service.addCourseManagement(this.courseManagement).subscribe((data) => {
      this.toaster.open("This user was assigned to this course successfully!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(["/admin","profile"]);
    })
  }

}
