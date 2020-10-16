import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from './user.model';
import { NotesService } from '../notes.service';

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
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgLMc4Cmh2tznYYgYzxHTvZZvfy_SKcwU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap(
          (data: AuthResponse) => {
            this.handleAuth(data.email, data.localId, data.idToken, Number(data.expiresIn));
          })
      )
  }

  createAccount(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgLMc4Cmh2tznYYgYzxHTvZZvfy_SKcwU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
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
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (userData) {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogOut(expiration);
      }
    }
    else {
      return;
    }
  }

  logOut(): void {
    this.user.next(null);
    this.notesService.setNotes([]);
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('userData');
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

}
