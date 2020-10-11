import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router) {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.isCollapsed = true;
        }
      });
  }

  ngOnInit(): void {
  }

}
