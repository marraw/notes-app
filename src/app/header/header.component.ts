import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

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
    this.isCollapsed = true;
  }

}
