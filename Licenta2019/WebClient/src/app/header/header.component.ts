import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showButtons:boolean;
  @Input() course:any;
  courseRoute: string;
  constructor() {
   }

  ngOnInit() {
    this.courseRoute = this.course ? this.course.id? this.course.id : this.course : null;
  }
}
