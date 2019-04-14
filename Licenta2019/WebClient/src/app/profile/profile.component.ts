import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project, ProjectDto } from '../models/project';
import { AddProjectService } from '../projects/add-project/add-project.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() button: any;
  showButton: boolean;
  course: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.showButton = true;
      this.course = this.route.snapshot.params.id;
    }
    else {
      if (this.button) {
        this.showButton = true;
        this.course = this.button;
      }
      else {
        this.showButton = false;
      }
    }
  }

  selectCourse(course: any) {
    if (this.course) {
      this.router.navigate(['/profile/', course.id]);
    }

    if (course) {
      this.showButton = true;
      this.course = course;
      this.router.navigate(['/profile/', course.id]);      
    }
  }

}
