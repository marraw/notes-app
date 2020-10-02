import { Component } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent {
  isImportant: boolean = false;

  constructor(private notesService: NotesService) { }

  newNote(title: string, text: string): void {
    this.notesService.addNote(title, text, this.isImportant);
  }
}
