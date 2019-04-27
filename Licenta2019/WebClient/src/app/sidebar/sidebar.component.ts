import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() year: EventEmitter<any> = new EventEmitter<any>();
  userInformation: any;
  userYears: number[] = [];
  showYearCourses: boolean[] = [];

  constructor(
    protected sidebarService: SidebarService
  ) { }

  ngOnInit() {
    var user = window.localStorage.getItem("userInfo");
    this.userInformation = JSON.parse(user);

    for (var i = 0; i < this.userInformation.year; i++) {
      this.userYears[i] = i + 1;
      this.showYearCourses[i] = false;
    }
  }

  selectYear(year: number) {
    this.year.emit(year);
  }

}
