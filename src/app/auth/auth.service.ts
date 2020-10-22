import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import { NotesService } from '../notes/notes.service';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notesService: NotesService
  ) { }

  logIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(
          (data: AuthResponse) => {
            this.handleAuth(data.email, data.localId, data.idToken, Number(data.expiresIn));
          })
      );
  }

  createAccount(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(
          (data: AuthResponse) => {
            this.handleAuth(data.email, data.localId, data.idToken, Number(data.expiresIn));
          })
      );
  }

  autoLogIn(): void {
    const userData: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (userData) {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData.token,
        new Date(userData.tokenExpirationDate)
      );

      if (loadedUser.userToken) {
        this.user.next(loadedUser);
        const expiration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogOut(expiration);
      }
    }
    else {
      return;
    }
  }

  logOut(): void {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.notesService.setNotes([]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expiration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expiration);
  }

  private handleAuth(email: string, userID: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userID, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password.';
        break;
    }
    return throwError(errorMessage);
  }

}
