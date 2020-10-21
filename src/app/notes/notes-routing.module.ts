import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';
import { NotesAddComponent } from './notes-add/notes-add.component';

const routes: Routes = [
  {
    path: 'notes-list', component: NotesListComponent, children: [
      { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
      { path: ':id/edit', component: NoteEditComponent }
    ]
  },
  { path: 'add-note', component: NotesAddComponent },
  // { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
