import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note } from 'src/app/shared/note';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  note: Note;
  id: number;

  constructor(private notesService: NotesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.note = this.notesService.getNote(this.id);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.note = this.notesService.getNote(this.id);
      }
    )
  }
}
