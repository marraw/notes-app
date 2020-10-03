import { Component, OnDestroy, OnInit } from '@angular/core';
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
  showDetails: boolean = false;
  private updateList!: Subscription;

  constructor(private notesService: NotesService) {
  }

  ngOnInit(): void {
    this.updateList = this.notesService.notesUpdate.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      });
    this.notes = this.notesService.notes;
  }

  ngOnDestroy(): void {
    this.updateList.unsubscribe();
  }
}
