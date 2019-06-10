import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  courseInformation: string;
  projectId: string;
  project: any;
  year: string;
  userInformation: any;
  isAssignedToAProject: boolean = false;
  serviceCalled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
    ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectid;
    this.year = this.route.snapshot.params.year;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);

    this.service.getProjectById(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.project = data;
    })

    this.service.getAssignedToProject(this.courseInformation, this.userInformation.id).subscribe((data: any) => {
      this.isAssignedToAProject = data;
      this.serviceCalled = true;
    });
  }

}
