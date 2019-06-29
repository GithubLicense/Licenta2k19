import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Student } from '../../models/student';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  firstName:string;
  lastName:string;
  year:string;
  group:string;
  email:string;
  student: Student = new Student();
  courseId: any;
  courseInformation: any;
  
  constructor(
    private service: AdminService,
    private router: Router,
    private toaster: MatSnackBar
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.student.FirstName = this.firstName;
    this.student.LastName = this.lastName;
    this.student.Year = this.year;
    this.student.Group = this.group;
    this.student.Email = this.email;
    this.service.addStudent(this.student).subscribe((data) => {
      this.toaster.open("The student has been successfully added!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(["/admin","profile"]);
    })
  }

}
