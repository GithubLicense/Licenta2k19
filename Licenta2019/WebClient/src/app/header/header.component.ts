import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showButtons:boolean;
  @Input() course:any;
  courseRoute: string;
  constructor(
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.showButtons = this.route.snapshot.params.id;
  }
}
