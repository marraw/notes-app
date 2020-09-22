import { Injectable } from '@angular/core';
import { Note } from "./note"

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