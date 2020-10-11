import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbCollapseDirective } from './header/ngbCollapse.directive';
import { ShortenPipe } from './shorten.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NoteDetailsComponent } from './notes-list/note-details/note-details.component';
import { NoteEditComponent } from './notes-list/note-edit/note-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbCollapseDirective,
    ShortenPipe,
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
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
