import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  courseInformation: string;
  projectId: string;
  teams: any;
  evaluationForm: boolean[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
  ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectid;
    let index = 0;
    this.service.getTeamsByProject(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.teams = data;
      this.teams.forEach(element => {
        element.githubUrl = "https://www.github.com/" + element.githubUsername + '/' + element.githubRepository;
        this.evaluationForm[index++] = false;
      });
    })
  }

  showEvaluationForm(i: number){
    this.evaluationForm[i] = true;
    console.log(this.evaluationForm);
  }

  closeEvaluationForm(i: number){
    this.evaluationForm[i] = false;
  }
}
