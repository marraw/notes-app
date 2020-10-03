import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './note'

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];
  notesUpdate = new Subject<Note[]>();

  get date(): { time: string, date: string } {
    const date = new Date();
    return { time: date.toLocaleTimeString(), date: date.toLocaleDateString() }
  }

  addNote(formValue: { title: string; text: string; important: boolean; },
    date: { time: string; date: string }): void {
    this.notes.push(
      new Note(formValue.title,
        formValue.text,
        formValue.important,
        undefined,
        date.time,
        date.date)
    );
    this.notesUpdate.next(this.notes);
  }

  removeNote(index: number): void {
    this.notes.splice(index, 1);
    this.notesUpdate.next(this.notes);
  }

  getNote(id: number): Note {
    return this.notes[id];
  }
}
