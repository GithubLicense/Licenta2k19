import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { AddProjectService } from './add-project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  code:string;
  name:string;
  nrMembers:string;
  nrTeams:string;
  maxGrade:string;
  description:string;
  project: Project = new Project();
  courseId: any;
  courseInformation: any;

  constructor(
    private service: AddProjectService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
      this.courseInformation = this.route.snapshot.params.id;
  }

  onSubmit(){
    this.courseInformation = this.route.snapshot.params.id;
    this.project.Code = this.code;
    this.project.Name = this.name;
    this.project.NumberOfMembers = this.nrMembers;
    this.project.NumberOfTeams = this.nrTeams;
    this.project.MaxGrade = this.maxGrade;
    this.project.Description = this.description;
    this.service.addProject(this.project, this.courseInformation).subscribe((data) => {
      this.router.navigate(["/profile",this.courseInformation,"projects"]);
    })
  }

}
