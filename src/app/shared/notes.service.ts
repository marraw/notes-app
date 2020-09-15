import { Injectable } from '@angular/core';
import { Note } from "./note"

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [
    {
      title: 'A test note title',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sapiente beatae illo, eum hic nulla deleniti id et? Fugit sint voluptas architecto. Corrupti ea tempore reprehenderit quas, laudantium dolorem blanditiis quae, incidunt repudiandae, cumque labore totam at obcaecati dolores numquam?',
      important: true
    },
    {
      title: 'A test note title',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sapiente beatae illo, eum hic nulla deleniti id et? Fugit sint voluptas architecto.'
    }
  ];

  getNotes(): Note[] {
    return this.notes;
  }
}