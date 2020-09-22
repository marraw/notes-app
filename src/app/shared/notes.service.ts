/*
Staraj się być konsekwentny w kodzie i jeśli Twój linter lub formater uzywa '', używaj tego w całym projekcie.
*/
import { Injectable } from '@angular/core';
import { Note } from "./note" // " should be ' (quotemark)tslint(1)

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];

  addNote(title: string, text: string, isImportant: boolean): void {
    const note = new Note(title, text, isImportant, undefined);
    this.notes.push(note);
  }

  getNote(id: number): Note {
    return this.notes[id];
  }
}
