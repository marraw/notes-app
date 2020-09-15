import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {
  isImportant = false;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
  }

  addNote(title: string, text: string) {
    const note = new Note(title, text, this.isImportant);
    this.notesService.notes.push(note);
  }
}
