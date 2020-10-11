import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotesService } from './notes.service';
import { map, tap } from 'rxjs/operators';
import { Note } from './note.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, private notesService: NotesService) { }

  storeNotesOnBE(): Observable<Note[] | any> {
    return this.http.put('https://notes-app-angular.firebaseio.com/notes.json', this.notesService.notes);
  }

  getNotesFromBE(): Observable<Note[]> {
    return this.http.get<Note[]>('https://notes-app-angular.firebaseio.com/notes.json').pipe(
      map(
        data => {
          if (data === null) {
            data = [];
          }
          return data;
        }
      ),
      tap(
        notes => {
          this.notesService.setNotes(notes);
        })
    );
  }

}
