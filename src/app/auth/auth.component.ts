import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  errorMessage: string | null = null;
  private subURL?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subURL = this.route.url.subscribe(
      url => {
        if (url[1].path === 'login') {
          this.loginMode = true;
        }
        else {
          this.loginMode = false;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
    }
    else {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponse>;

    if (this.loginMode) {
      authObservable = this.authService.logIn(email, password);
    }
    else {
      authObservable = this.authService.createAccount(email, password);
    }

    authObservable.subscribe(
      user => {
        this.router.navigate(['notes-list']);
        this.isLoading = false;
      },
      error => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  navToCreateAcc(): void {
    this.loginMode = false;
    this.router.navigate(['auth/signup']);
  }

  ngOnDestroy(): void {
    this.subURL?.unsubscribe();
  }

}
