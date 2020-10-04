import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('noteAdded', { static: false }) noteAdded!: ElementRef;

  constructor(private notesService: NotesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'text': new FormControl(null, Validators.required),
      'important': new FormControl(this.isImportant)
    });
  }

  onSubmit(): void {
    this.notesService.addNote(this.noteForm.value, this.notesService.date);
    this.renderer.setStyle(this.noteAdded.nativeElement, 'visibility', 'visible');
    setTimeout(() => {
      this.renderer.setStyle(this.noteAdded.nativeElement, 'visibility', 'hidden');
    }, 1500)
    this.noteForm.reset();
  }
}