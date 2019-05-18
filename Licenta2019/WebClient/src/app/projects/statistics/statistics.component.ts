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
  displayedColumns: string[];

  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.courseId = this.route.snapshot.params.id;
    this.displayedColumns = ['Github username', 'Number of commits', 'Number of added lines', 'Number of deleted lines'];

    this.service.getTeamInfo(this.courseId, this.userInformation.id).subscribe((data: any) => {
      this.teamInformation = data;
      this.service.getTeamStatistics(this.courseId,this.teamInformation.projectId, this.teamInformation.teamId).subscribe((data: any) => {
        this.teamStatistics = data;
        this.teamStatistics.collaborators.sort((a, b) => (a.numberOfCommits < b.numberOfCommits) ? 1 : -1);
      console.log(this.teamStatistics);
      });
    });
  }

}
