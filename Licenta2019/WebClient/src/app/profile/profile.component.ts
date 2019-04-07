import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() button: boolean; 
  showButton: boolean;
  constructor() { }

  ngOnInit() {
    if(this.button){
      this.showButton = this.button;
    }
    else
    {
      this.showButton = false;
    }
  }

  selectCourse(course: any) {
    if (course) {
      this.showButton = true;
    }
  }

}
