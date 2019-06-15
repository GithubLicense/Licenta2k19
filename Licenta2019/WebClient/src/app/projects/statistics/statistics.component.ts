import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('lineChart') lineChart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;

  courseId: string;
  projectId: string;
  teamId: string;
  userInformation: any;
  teamInformation: any = [];
  teamStatistics: any;
  isLoaded: boolean = false;
  displayedColumns: string[];
  LineChart = [];
  PieChart = [];
  days: string[] = [];
  additions: number[] = [];
  deletions: number[] = [];
  weekDays: string[] = [];
  percentage: number[] = [];


  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.courseId = this.route.snapshot.params.id;
    this.projectId = this.route.snapshot.params.projectId;
    this.teamId = this.route.snapshot.params.teamId;

    this.displayedColumns = ['Github username', 'Number of commits', 'Number of added lines', 'Number of deleted lines'];

    if (this.userInformation.userPosition == 0) {
      this.service.getTeamInfo(this.courseId, this.userInformation.id).subscribe((data: any) => {
        this.teamInformation = data;
        this.service.getTeamStatistics(this.courseId, this.teamInformation.projectId, this.teamInformation.teamId).subscribe((data: any) => {
          this.teamStatistics = data;
          this.teamStatistics.collaborators.sort((a, b) => (a.numberOfCommits < b.numberOfCommits) ? 1 : -1);
          this.teamStatistics.codeFrequency.forEach(element => {
            this.days.push(element.day.slice(0, 10));
            this.additions.push(element.additions);
            this.deletions.push(element.deletions * (-1));
          });
          this.teamStatistics.dayStatistics.forEach(element => {
            this.weekDays.push(element.day);
            this.percentage.push(element.percentage);
          });
          this.isLoaded = true;

          var ctx = this.lineChart.nativeElement;
          this.LineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.days,
              datasets: [{
                label: 'Lines added',
                data: this.additions,
                fill: false,
                lineTension: 0.2,
                borderColor: "red",
                borderWidth: 2
              },
              {
                label: 'Lines deleted',
                data: this.deletions,
                fill: false,
                lineTension: 0.2,
                borderColor: "blue",
                borderWidth: 2
              },
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                text: "Additions and Deletions Chart",
                display: true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });

          var pieCtx = this.pieChart.nativeElement;
          this.PieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
              labels: this.weekDays,
              datasets: [{
                data: this.percentage,
                backgroundColor: [
                  '#003873',
                  '#006400',
                  '#32CD32',
                  '#FFFF00',
                  '#ff6600',
                  '#ff0a00',
                  '#800000'
                ],
                borderColor: [
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white'
                ],
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                text: "Days of the week statistics",
                display: true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        });
      });
    }
    else {
      this.service.getTeamStatistics(this.courseId, this.projectId, this.teamId).subscribe((data: any) => {
        this.teamStatistics = data;
        this.teamStatistics.collaborators.sort((a, b) => (a.numberOfCommits < b.numberOfCommits) ? 1 : -1);
        this.teamStatistics.codeFrequency.forEach(element => {
          this.days.push(element.day.slice(0, 10));
          this.additions.push(element.additions);
          this.deletions.push(element.deletions * (-1));
        });
        this.teamStatistics.dayStatistics.forEach(element => {
          this.weekDays.push(element.day);
          this.percentage.push(element.percentage);
        });
        this.isLoaded = true;

        var ctx = this.lineChart.nativeElement;
        this.LineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.days,
            datasets: [{
              label: 'Lines added',
              data: this.additions,
              fill: false,
              lineTension: 0.2,
              borderColor: "red",
              borderWidth: 2
            },
            {
              label: 'Lines deleted',
              data: this.deletions,
              fill: false,
              lineTension: 0.2,
              borderColor: "blue",
              borderWidth: 2
            },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              text: "Additions and Deletions Chart",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });

        var pieCtx = this.pieChart.nativeElement;
        this.PieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: this.weekDays,
            datasets: [{
              data: this.percentage,
              backgroundColor: [
                '#003873',
                '#006400',
                '#32CD32',
                '#FFFF00',
                '#ff6600',
                '#ff0a00',
                '#800000'
              ],
              borderColor: [
                'white',
                'white',
                'white',
                'white',
                'white',
                'white',
                'white'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              text: "Days of the week statistics",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    }
  }
}
