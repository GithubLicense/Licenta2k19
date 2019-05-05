import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Guid } from "guid-typescript";
import { AddProjectService } from '../projects/add-project/add-project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButtons: boolean = false;
  courseId: string;
  urlParsed: string[];
  userInformation: any;
  showEvaluationButton: boolean = false;
  checkCourseId: boolean;
  constructor(
    private router: Router,
    private service: AddProjectService
  ) {
  }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.checkCourseId = false;
        this.urlParsed = val.url.split('/');
        this.urlParsed.forEach(element => {
          if (Guid.isGuid(element) && !this.checkCourseId) {
            this.showButtons = true;
            this.courseId = element;
            this.checkCourseId = true;
          }
        });
        if (this.courseId) {
            this.service.getAssignedToProject(this.courseId, this.userInformation.id).subscribe((data: any) => {
            this.showEvaluationButton = data;
          });
        }
      }
    });

   
  }
}
