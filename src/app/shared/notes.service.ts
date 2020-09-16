import { Injectable } from '@angular/core';
import { Note } from "./note"

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];

  getNotes(): Note[] {
    return this.notes;
  }

  getNote(id: number): Note {
    return this.notes[id];
  }
}