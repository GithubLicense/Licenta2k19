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
  @ViewChild('pieChart') pieChart:ElementRef;

  courseId: string;
  userInformation: any;
  teamInformation: any = [];
  teamStatistics: any;
  isLoaded: boolean = false;
  displayedColumns: string[];
  LineChart = [];
  PieChart = [];


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
      this.service.getTeamStatistics(this.courseId, this.teamInformation.projectId, this.teamInformation.teamId).subscribe((data: any) => {
        this.teamStatistics = data;
        this.teamStatistics.collaborators.sort((a, b) => (a.numberOfCommits < b.numberOfCommits) ? 1 : -1);
        this.teamStatistics.codeFrequency.forEach(element => {
          element.day = element.day.slice(0, 10);
        });
        this.isLoaded = true;
        console.log(this.teamStatistics);
      });
    });

    var ctx = this.lineChart.nativeElement;
    this.LineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: 'Number of Items Sold in Months',
          data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1
        },
        {
          label: 'Test Line',
          data: [3, 5, 3, 1, 7, 8, 14, 20, 6, 9, 14, 2],
          fill: false,
          lineTension: 0.2,
          borderColor: "blue",
          borderWidth: 1
        },
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          text: "Line Chart",
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          text: "Pie Chart",
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


  }


}
