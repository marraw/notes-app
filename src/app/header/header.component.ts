import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLoggedIn = false;
  loggedUser?: string;
  private subNav?: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subNav = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isCollapsed = true;
      }
    });
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user?.userToken) {
        this.isLoggedIn = true;
        this.loggedUser = user.email;
      } else {
        this.isLoggedIn = false;
        this.loggedUser = undefined;
      }
    });
  }

  logout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subNav?.unsubscribe();
  }
}
