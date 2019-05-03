import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButtons: boolean = false;
  courseId: string;
  urlParsed: string[];
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.urlParsed = val.url.split('/');
        this.urlParsed.forEach(element => {
          if(Guid.isGuid(element) && this.showButtons == false){
            this.showButtons = true;
            this.courseId = element;
          }
        });
    }
  });
   }

  ngOnInit() {
  }
}
