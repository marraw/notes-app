import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  note: Note | undefined;
  id: number = 0;
  editMode: boolean = false;

  constructor(private notesService: NotesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.notesService.notes.forEach((note, index) => {
      this.id = index;
      note.id = this.id;
    })
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.note = this.notesService.getNote(this.id);
      })
  }

  removeNote(): void {
    this.notesService.notes.splice(this.id, 1);
    this.router.navigate(['notes-list']);
  }
}
