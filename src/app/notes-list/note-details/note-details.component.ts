import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../note.model';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  note!: Note;
  @Input() id = 0;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.note = this.notesService.getNote(this.id);
  }

}
