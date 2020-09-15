import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'notes-list', pathMatch: 'full' },
  { path: 'notes-list', component: NotesListComponent },
  { path: 'add-note', component: NotesAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
