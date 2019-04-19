import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';
import { UserService } from '../../services/user.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  courseInformation: string;
  projectId: string;
  project: any;
  projectYear: string;
  repository: string;
  username: string;
  firstName: string;
  lastName: string;
  users: any[];
  searchedUsers: any[];
  teammates: any[] = [];
  team: Team = new Team();
  maxTeammates: number;
  userInformation: any;

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectid;
    this.service.getProjectById(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.project = data;
      this.maxTeammates = this.project.numberOfMembers;
    })
    this.service.getProjectYear(this.courseInformation, this.projectId).subscribe((data: any) => {
      this.projectYear = data;
      this.userService.getProjects(this.projectYear).subscribe((data: any) => {
        this.users = data;
      })
    })
  }

  search() {
    this.searchedUsers = [];
    this.users.forEach(element => {
      if (this.firstName && this.lastName) {
        if (element.firstName.toLowerCase().search(this.firstName.toLowerCase()) != -1 && element.lastName.toLowerCase().search(this.lastName.toLowerCase()) != -1) {
          this.searchedUsers.push(element);
        }
      }
      else {
        if (this.firstName) {
          if (element.firstName.toLowerCase().search(this.firstName.toLowerCase()) != -1) {
            this.searchedUsers.push(element);
          }
        }
        else{
          if(this.lastName){
            if (element.lastName.toLowerCase().search(this.lastName.toLowerCase()) != -1) {
              this.searchedUsers.push(element);
            }
          }
        }
      }
    })
  }

  add(user: any){
    if(this.teammates.indexOf(user) == -1){
      this.teammates.push(user); 
    }
  }

  delete(teammate: any){
    this.teammates = this.teammates.filter(element => element !== teammate);
  }

  submit(){
    this.team.GithubRepository = this.repository;
    this.team.GithubUsername = this.username;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.team.Teammates.push(this.userInformation.id);
    this.teammates.forEach(item => {
      this.team.Teammates.push(item.id);
    });

    this.service.assignToProject(this.team, this.courseInformation, this.projectId).subscribe((data) => {
      console.log(data);
    })
  }
}
