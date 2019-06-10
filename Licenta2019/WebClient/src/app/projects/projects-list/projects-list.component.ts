import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: any[];
  courseInformation: any;
  year: string;
  userInformation: any;
  isAssignedToAProject: boolean = false;
  serviceExecuted: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.year = this.route.snapshot.params.year;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.service.getProjects(this.courseInformation).subscribe((data: any) => {
      this.projects = data;
    })

    this.service.getAssignedToProject(this.courseInformation, this.userInformation.id).subscribe((data: any) => {
      this.isAssignedToAProject = data;
      this.serviceExecuted = true;
    });
  }

}
