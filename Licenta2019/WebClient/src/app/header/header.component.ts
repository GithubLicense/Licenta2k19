import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButtons: boolean;
  courseId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.courseId = val.url.split('/').pop();
        this.showButtons = Guid.isGuid(this.courseId);
        console.log(this.showButtons);
    }
  });
   }

  ngOnInit() {
  }
}
