import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NgbCollapse } from './shared/ngbCollapse.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NoteDetailsComponent } from './notes-list/note-details/note-details.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbCollapse,
    PageNotFoundComponent,
    HeaderComponent,
    NotesListComponent,
    NotesAddComponent,
    NoteDetailsComponent,
    NoteEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
