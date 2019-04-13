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
  project: ProjectDto = new ProjectDto();
  projects: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AddProjectService) {
      this.projects = null;
     }

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
    this.service.getProjects(course.id).subscribe((data: any) => {
      this.projects = data;
    })
    
    if (this.course) {
      this.router.navigate(['/profile/', course.id]);
    }

    if (course) {
      this.showButton = true;
      this.course = course;
    }
  }

}
