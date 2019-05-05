import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../add-project/add-project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  userInformation: any;
  courseId: string;
  evaluations: any[];
  constructor(
    private service: AddProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params.id;
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.service.getEvaluations(this.courseId, this.userInformation.id).subscribe((data: any) => {
      this.evaluations = data;
      console.log(this.evaluations);
    });
  }

}
