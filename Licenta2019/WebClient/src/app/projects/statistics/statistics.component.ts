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
  @ViewChild('lineChart2') lineChart2:  ElementRef;

  courseId: string;
  projectId: string;
  teamId: string;
  userInformation: any;
  teamInformation: any = [];
  teamStatistics: any;
  isLoaded: boolean = false;
  displayedColumns: string[];
  LineChart = [];
  LineChart2 = [];
  PieChart = [];
  days: string[] = [];
  additions: number[] = [];
  deletions: number[] = [];
  weekDays: string[] = [];
  percentage: number[] = [];
  chart3Datasets: any[] = [];
  dataset: any = {};
  userAdditions: number[] = [];


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
          console.log(this.teamStatistics);
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

          this.teamStatistics.collaboratorsCodeFrequency.forEach(element => {
            this.dataset.label = element.username;
            element.userCodeFrequency.forEach(element => {
              this.userAdditions.push(element.additions);
            });;
            this.dataset.data = this.userAdditions;
            this.dataset.fill = false,
            this.dataset.lineTension = 0.2,
            this.dataset.borderColor = this.getRandomColor(),
            this.dataset.borderWidth = 2;
            this.chart3Datasets.push({...this.dataset});
            this.userAdditions = [];
          });

          var chart3 = this.lineChart2.nativeElement;
          this.LineChart2 = new Chart(chart3, {
            type: 'line',
            data: {
              labels: this.days,
              datasets: this.chart3Datasets

            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                text: "Commits of every collaborator Chart",
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

        
        this.teamStatistics.collaboratorsCodeFrequency.forEach(element => {
          this.dataset.label = element.username;
          element.userCodeFrequency.forEach(element => {
            this.userAdditions.push(element.additions);
          });;
          this.dataset.data = this.userAdditions;
          this.dataset.fill = false,
          this.dataset.lineTension = 0.2,
          this.dataset.borderColor = this.getRandomColor(),
          this.dataset.borderWidth = 2;
          this.chart3Datasets.push({...this.dataset});
          this.userAdditions = [];
        });

        var chart3 = this.lineChart2.nativeElement;
          this.LineChart2 = new Chart(chart3, {
            type: 'line',
            data: {
              labels: this.days,
              datasets: this.chart3Datasets

            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                text: "Commits of every collaborator Chart",
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

  private getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
