import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { AddProjectService } from './add-project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  year: any;

  constructor(
    private service: AddProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: MatSnackBar
    ) { }

  ngOnInit() {
      this.courseInformation = this.route.snapshot.params.id;
      this.year = this.route.snapshot.params.year;
  }

  onSubmit(){
    this.courseInformation = this.route.snapshot.params.id;
    this.project.Code = (Math.floor(Math.random() * 1000) + 1).toString();
    this.project.Name = this.name;
    this.project.NumberOfMembers = this.nrMembers;
    this.project.NumberOfTeams = this.nrTeams;
    this.project.MaxGrade = this.maxGrade;
    this.project.Description = this.description;
    this.service.addProject(this.project, this.courseInformation).subscribe((data) => {
      this.toaster.open("The project has been successfully added!", 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(["/year",this.year,"profile",this.courseInformation,"projects"]);
    })
  }

}
