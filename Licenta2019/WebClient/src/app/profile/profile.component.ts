import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() button: any; 
  showButton: boolean;
  course:any;
  constructor(private router: Router) { }

  ngOnInit() {
    if(this.button){
      this.showButton = true;
      this.course = this.button;
    }
    else
    {
      this.showButton = false;
    }
  }

  selectCourse(course: any) {
    if(this.course)
    {
      this.router.navigate(['/profile/', course.id,'add-project']);
    }

    if (course) {
      this.showButton = true;
      this.course = course;
    }
  }

}
