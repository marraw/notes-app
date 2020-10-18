import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Params, Router } from '@angular/router';
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
  id = 0;
  editMode = false;
  private subID?: Subscription;
  private subNav?: Subscription;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subNav = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart && this.note.text !== '' && this.editMode) {
          this.onEditNote();
        }
        this.editMode = false;
      });
  }

  ngOnInit(): void {
    this.editMode = false;
    this.subID = this.route.params.subscribe(
      (params: Params) => {
        this.onUpdateTime();
        this.editMode = false;
        this.id = params.id;
        this.note = this.notesService.getNote(this.id);
      });
  }

  onEditNote(): void {
    this.onUpdateTime();
    this.notesService.editNote(this.id, this.note);
    this.editMode = !this.editMode;
  }

  onUpdateTime(): void {
    if (this.editMode) {
      this.note.time = this.notesService.date.time;
      this.note.date = this.notesService.date.date;
    }
  }

  onRemoveNote(): void {
    this.notesService.removeNote(this.id);
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subID?.unsubscribe();
    this.subNav?.unsubscribe();
  }

}
