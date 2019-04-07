import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WebClient';
  showButtons: boolean;

  ngOnInit(): void {
    window.localStorage.setItem("buttons", "false");
    this.showButtons=JSON.parse(window.localStorage.getItem("buttons"));
  }

}
