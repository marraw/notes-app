import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../shared/note';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  /*
    Jeśli ustawiasz typ np Note | undefined, musisz pamiętać o tym, aby używać safe operatora ? w template'cie:
    <h5>{{note?.title}} <span class="badge badge-warning badge-pill" *ngIf="note?.important">Important</span>
    'note' is possibly undefined. Consider using the safe navigation operator (note?.title) or non-null assertion operator (note!.title).ng

    W innym przypadku używasz Non-null assertion operator. W tym przypadku oznajmiasz, że zmienna note nigdy nie będzie undefined.
    Oczywiście jeśli będzie to wywali Ci Runtime Error, musisz wiedzieć kiedy możesz pozwolić sobie na uzycie tego.
    https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  */
  note!: Note;
  /*
  Tutaj nie musisz oznajmiać typu zmiennej, ponieważ odrazu ją przypisujesz. Szczerze, to zależy od zespołu.
  Niektórzy wolą dmuchać na zimne :)

  */
  @Input() index: number = 0; // Type number trivially inferred from a number literal, remove type annotation (no-inferrable-types)tslint(1)

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.note = this.notesService.getNote(this.index);
  }
}
