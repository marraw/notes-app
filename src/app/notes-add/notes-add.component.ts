import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {
  isImportant: boolean = false;
  id: number = 0;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
  }

  addNote(title: string, text: string): void {
    const note = new Note(title, text, this.id, this.isImportant);
    this.notesService.notes.push(note);
    this.id++;
    console.log(this.notesService.notes);
  }
}
