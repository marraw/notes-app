import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];
  notesUpdate = new Subject<Note[]>();

  get date(): { time: string, date: string } {
    const date = new Date();
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: date.toLocaleDateString()
    };
  }

  getNote(id: number): Note {
    return this.notes[id];
  }

  setNotes(notes: Note[]): void {
    this.notes = notes;
    this.notesUpdate.next(this.notes);
  }

  addNote(
    formValue: { title: string; text: string; important: boolean; },
    date: { time: string; date: string }
  ): void {
    const note = new Note(
      formValue.title,
      formValue.text,
      formValue.important,
      date.time,
      date.date);
    this.notes.push(note);
    this.notesUpdate.next(this.notes);
  }

  editNote(id: number, note: Note): void {
    this.notes[id] = note;
    this.notesUpdate.next(this.notes);
  }

  removeNote(index: number): void {
    this.notes.splice(index, 1);
    this.notesUpdate.next(this.notes);
  }
}
