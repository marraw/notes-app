import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  showDetails: boolean = false;

  constructor(private notesService: NotesService) {
  }

  ngOnInit(): void {
    this.notes = this.notesService.notes;
  }
}
