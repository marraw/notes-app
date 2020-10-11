import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  editMode = false;
  private updateList!: Subscription;

  constructor(
    private notesService: NotesService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.dataStorageService.getNotesFromBE().subscribe();
    this.updateList = this.notesService.notesUpdate.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      });
  }

  ngOnDestroy(): void {
    this.updateList.unsubscribe();
  }
}
