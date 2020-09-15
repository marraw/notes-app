import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
  }
}
