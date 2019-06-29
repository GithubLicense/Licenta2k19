import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  firstName:string;
  lastName:string;
  email:string;
  teacher: Teacher = new Teacher();
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
    this.teacher.FirstName = this.firstName;
    this.teacher.LastName = this.lastName;
    this.teacher.Email = this.email;
    this.service.addTeacher(this.teacher).subscribe((data) => {
      this.toaster.open("The teacher has been successfully added!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(["/admin","profile"]);
    })
  }

}
