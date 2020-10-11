import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotesService } from '../notes.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {
  noteForm!: FormGroup;
  @ViewChild('noteAdded', { static: false }) noteAdded!: ElementRef;

  constructor(
    private notesService: NotesService,
    private dataStorageService: DataStorageService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      text: new FormControl(null, Validators.required),
      important: new FormControl(false)
    });
  }

  onAddNote(): void {
    this.notesService.addNote(this.noteForm.value, this.notesService.date);
    this.dataStorageService.storeNotesOnBE().subscribe();
    this.noteForm.reset({
      title: null,
      text: null,
      important: false
    });
    this.renderer.setStyle(this.noteAdded.nativeElement, 'visibility', 'visible');
    setTimeout(() => {
      this.renderer.setStyle(this.noteAdded.nativeElement, 'visibility', 'hidden');
    }, 2000);
  }

}
