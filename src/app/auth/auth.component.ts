import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  errorMessage: string | null = null;
  authForm!: FormGroup;
  private activeURL?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.activeURL = this.route.url.subscribe((url) => {
      if (url[0].path === 'login') {
        this.loginMode = true;
      } else {
        this.loginMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.authForm) {
      this.isLoading = true;
    } else {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    let authObservable: Observable<AuthResponse>;

    if (this.loginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      authObservable = this.authService.createAccount(email, password);
    }

    authObservable.subscribe(
      (user) => {
        this.router.navigate(['notes-list']);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    this.authForm.reset();
  }

  ngOnDestroy(): void {
    this.activeURL?.unsubscribe();
  }
}
