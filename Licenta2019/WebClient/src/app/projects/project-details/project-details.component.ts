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

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
    ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectid;
    this.year = this.route.snapshot.params.year;
    this.service.getProjectById(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.project = data;
    })
  }

}
