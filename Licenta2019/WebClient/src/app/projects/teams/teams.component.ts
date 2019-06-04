import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';
import { Evaluation } from '../../models/evaluation';

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
  type: string;
  grade: string;
  description: string;
  evaluation: Evaluation = new Evaluation();
  userInformation: any;

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
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
  }

  closeEvaluationForm(i: number){
    this.evaluationForm[i] = false;
  }

  onSubmit(teamId: any, i: number){
    this.evaluation.Type = this.type;
    this.evaluation.Grade = this.grade;
    this.evaluation.Description = this.description;
    this.service.addEvalution(this.evaluation, this.courseInformation, this.projectId, teamId).subscribe((data) => {
      this.evaluationForm[i] = false;
      this.type = undefined;
      this.grade = undefined;
      this.description = undefined;
    })
  }
}
