import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NoteDetailsComponent } from './notes-list/note-details/note-details.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';

@NgModule({
  declarations: [
    NotesListComponent,
    NotesAddComponent,
    NoteDetailsComponent,
    NoteEditComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, SharedModule, NotesRoutingModule],
})
export class NotesModule {}
