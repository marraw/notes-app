import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'notes-list', pathMatch: 'full' },
  {
    path: 'notes-list', component: NotesListComponent, children: [
      { path: ':id', component: NoteEditComponent }
    ]
  },
  { path: 'add-note', component: NotesAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
