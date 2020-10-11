import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/note.model';
import { NotesService } from 'src/app/notes.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit, OnDestroy {
  note!: Note;
  id = 0;
  editMode = false;
  private subID!: Subscription;
  private subNav!: Subscription;

  constructor(
    private notesService: NotesService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subNav = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.onEditNote();
          this.editMode = false;
        }
      });
  }

  ngOnInit(): void {
    this.editMode = false;
    this.subID = this.route.params.subscribe(
      (params: Params) => {
        this.onUpdateTime();
        this.editMode = false;
        params = { id: this.id };
        this.note = this.notesService.getNote(this.id);
      });
  }

  onEditNote(): void {
    this.onUpdateTime();
    this.notesService.editNote(this.id, this.note);
    this.editMode = !this.editMode;
    this.dataStorageService.storeNotesOnBE().subscribe();
  }

  onUpdateTime(): void {
    if (this.editMode) {
      this.note.time = this.notesService.date.time;
      this.note.date = this.notesService.date.date;
    }
  }

  onRemoveNote(): void {
    this.notesService.removeNote(this.id);
    this.dataStorageService.storeNotesOnBE().subscribe();
    this.router.navigate(['notes-list']);
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
    this.subNav.unsubscribe();
  }

}
