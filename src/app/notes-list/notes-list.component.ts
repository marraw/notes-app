import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  editMode: boolean = false;
  private updateList!: Subscription;

  constructor(private notesService: NotesService, private router: Router) {
  }

  ngOnInit(): void {
    this.updateList = this.notesService.notesUpdate.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      });
    this.notes = this.notesService.notes;
  }

  navigateToAddNote(): void {
    this.router.navigate(['add-note']);
  }

  ngOnDestroy(): void {
    this.updateList.unsubscribe();
  }
}
