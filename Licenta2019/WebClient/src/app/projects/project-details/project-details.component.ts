import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  courseInformation: any;
  projectId: string;
  project: any;

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
    ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectid;
    this.service.getProjectById(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.project = data;
      console.log(this.project);
    })
  }

}
