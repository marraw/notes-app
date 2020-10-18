import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'notes-list', pathMatch: 'full' },
  {
    path: 'notes-list', component: NotesListComponent, children: [
      { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
      { path: ':id/edit', component: NoteEditComponent }
    ]
  },
  { path: 'add-note', component: NotesAddComponent },
  { path: 'auth/login', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', component: AuthComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
