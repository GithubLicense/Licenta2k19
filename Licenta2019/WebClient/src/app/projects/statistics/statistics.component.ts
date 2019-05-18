import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  courseId: string;
  userInformation: any;
  teamInformation: any = [];
  teamStatistics: any;

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.courseId = this.route.snapshot.params.id;

    this.service.getTeamInfo(this.courseId, this.userInformation.id).subscribe((data: any) => {
      this.teamInformation = data;
      this.service.getTeamStatistics(this.courseId,this.teamInformation.projectId, this.teamInformation.teamId).subscribe((data: any) => {
        this.teamStatistics = data;
      console.log(this.teamStatistics);
      });
    });
  }

}
