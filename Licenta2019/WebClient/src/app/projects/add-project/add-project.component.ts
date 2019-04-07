import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { AddProjectService } from './add-project.service';

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

  constructor(private service: AddProjectService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.project.Code = this.code;
    this.project.Name = this.name;
    this.project.NrMembers = this.nrMembers;
    this.project.NrTeams = this.nrTeams;
    this.project.MaxGrade = this.maxGrade;
    this.project.Description = this.description;
    this.service.addProject(this.project).subscribe((data) => {
      console.log(data);
    })
  }

}
