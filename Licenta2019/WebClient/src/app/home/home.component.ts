import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAdmin: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.url[0].path == 'admin'){
      this.isAdmin = true;
    }
  }

}
