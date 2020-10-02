import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/note';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit, OnDestroy {
  note!: Note;
  id: number = 0;
  editMode: boolean = false;
  private subParams!: Subscription;

  constructor(private notesService: NotesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.notesService.notes.forEach((note, index) => {
      this.id = index;
      note.id = this.id;
    });
    this.subParams = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.note = this.notesService.getNote(this.id);
      });
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
  }

  removeNote(): void {
    this.notesService.notes.splice(this.id, 1);
    this.router.navigate(['notes-list']);
  }
}
