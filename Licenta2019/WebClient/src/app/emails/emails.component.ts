import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Email, Teacher } from '../models/email';
import { AddProjectService } from '../projects/add-project/add-project.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {

  userInformation: any;
  courseId: string;
  teachers: any[];
  checked: Teacher[] = [];
  teachersToSend: Teacher[];
  teachersEmail: string[] = [];
  subject: string;
  message: string;
  email: Email = new Email();

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private emailService: AddProjectService
    ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;
    this.service.getCourseTeachers(this.courseId).subscribe((data: any) => {
      this.teachers = data;
      for(var i=0; i<this.teachers.length; i++){
        this.checked.push({TeacherMail: this.teachers[i].email, SendEmail: false})
      }
    })
  }

  onSubmit(){
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.teachersToSend = this.checked.filter(c => c.SendEmail === true);
    this.teachersToSend.forEach(element => {
      this.teachersEmail.push(element.TeacherMail);
    });
    this.email.Teachers = this.teachersEmail;
    this.email.Subject = this.subject;
    this.email.Body = this.message;
    this.emailService.sendEmail(this.email, this.userInformation.id).subscribe((data) => {
      console.log(data);
    })
  }

}
