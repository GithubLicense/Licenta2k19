import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProjectService } from '../add-project/add-project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: any[];
  courseInformation: any;
  constructor(
    private route: ActivatedRoute,
    private service: AddProjectService) { }

  ngOnInit() {
    this.courseInformation = this.route.snapshot.params.id;
    this.service.getProjects(this.courseInformation).subscribe((data: any) => {
      this.projects = data;
    })
  }

}
