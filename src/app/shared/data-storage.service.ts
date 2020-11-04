import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotesService } from '../notes/notes.service';
import { map, tap } from 'rxjs/operators';
import { Note } from '../notes/note.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  loggedUser?: string;

  constructor(
    private http: HttpClient,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  storeNotesOnServer(): Observable<Note[]> {
    this.authService.user.subscribe((user) => {
      this.loggedUser = user?.id;
    });
    return this.http.put<Note[]>(
      `https://notes-app-angular.firebaseio.com/${this.loggedUser}.json`,
      this.notesService.notes
    );
  }

  getNotesFromServer(): Observable<Note[]> {
    this.authService.user.subscribe((user) => {
      this.loggedUser = user?.id;
    });
    return this.http
      .get<Note[]>(
        `https://notes-app-angular.firebaseio.com/${this.loggedUser}.json`
      )
      .pipe(
        map((data) => {
          if (data === null) {
            data = [];
          }
          return data;
        }),
        tap((notes) => {
          this.notesService.setNotes(notes);
        })
      );
  }
}
