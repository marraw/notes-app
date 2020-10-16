import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { DataStorageService } from '../data-storage.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  editMode = false;
  isLoading = true;
  private subAuth!: Subscription;
  private subNotesUpdate!: Subscription;
  private subURL?: Subscription;

  constructor(
    private notesService: NotesService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subAuth = this.authService.user.subscribe(
      user => {
        if (user?.token) {
          this.dataStorageService.getNotesFromServer().subscribe();
        }
        else {
          this.notes = this.notesService.notes;
          this.isLoading = false;
        }
      });

    this.subNotesUpdate = this.notesService.notesUpdate.subscribe(
      (notes: Note[]) => {
        if (this.dataStorageService.loggedUser) {
          this.dataStorageService.storeNotesOnServer().subscribe();
        }
        this.notes = notes;
        this.isLoading = false;
      });

    this.subURL = this.route.firstChild?.url.subscribe(
      (url: UrlSegment[]) => {
        const noteID = Number(url[0].path);
        if (
          noteID > this.notes.length ||
          noteID === 0 && this.notes.length === 0 ||
          Number.isNaN(noteID)
        ) {
          this.router.navigate(['page-not-found']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subAuth.unsubscribe();
    this.subNotesUpdate.unsubscribe();
    this.subURL?.unsubscribe();
  }

}
