import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLoggedIn = false;
  private subNav?: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subNav = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.isCollapsed = true;
        }
      });
  }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        if (user?.token) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
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
