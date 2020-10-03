import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {
  isImportant: boolean = false;
  noteForm!: FormGroup;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'text': new FormControl(null, Validators.required),
      'important': new FormControl(this.isImportant)
    });
  }

  onSubmit(): void {
    this.notesService.addNote(this.noteForm.value, this.notesService.date);
    this.noteForm.reset();
  }
}