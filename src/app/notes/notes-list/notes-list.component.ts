import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { NotesService } from '../notes.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('delete', [
      state('normal', style({
        opacity: 1,
        transform: 'translateX(0) scale(1)'
      })),
      transition('* => void', [
        animate(100, style({
          transform: 'scale(0.75)'
        })),
        animate(200,
          style({
            opacity: 0,
            transform: 'translateX(-700px) scale(0.75)'
          }))
      ])
    ])
  ]
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
    this.subAuth = this.authService.user.subscribe(
      user => {
        if (user?.userToken) {
          this.dataStorageService.getNotesFromServer().subscribe();
        }
        else {
          this.notes = this.notesService.notes;
          this.isLoading = false;
        }
      });

    this.subNotesUpdate = this.notesService.notesUpdate.subscribe(
      notes => {
        this.notes = notes;
        if (this.dataStorageService.loggedUser) {
          this.dataStorageService.storeNotesOnServer().subscribe();
        }
        this.isLoading = false;

        this.subURL = this.route.firstChild?.url.subscribe(
          (url: UrlSegment[]) => {
            const noteID = Number(url[0].path);
            if (
              noteID > this.notes.length ||
              noteID < 0 ||
              noteID === 0 && this.notes.length === 0 ||
              Number.isNaN(noteID)
            ) {
              this.router.navigate(['page-not-found']);
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.subAuth.unsubscribe();
    this.subNotesUpdate.unsubscribe();
    this.subURL?.unsubscribe();
  }

}
