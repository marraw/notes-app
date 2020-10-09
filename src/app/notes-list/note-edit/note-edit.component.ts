import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/note.model';
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
    this.subParams = this.route.params.subscribe(
      (params: Params) => {
        this.updateTime();
        this.editMode = false;
        this.id = +params['id'];
        this.note = this.notesService.getNote(this.id);
      });
  }

  editNote(): void {
    this.updateTime();
    this.editMode = !this.editMode;
  }

  updateTime(): void {
    if (this.editMode) {
      this.note.time = this.notesService.date.time;
      this.note.date = this.notesService.date.date;
    }
  }

  removeNote(): void {
    this.notesService.removeNote(this.id);
    this.router.navigate(['notes-list']);
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
  }
}
