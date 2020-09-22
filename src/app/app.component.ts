import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
/*
  Nie ma sensu uzywać shared module kiedy nie używasz note.ts czy noteService w headerze/footerze.
  Powinieneś przenieść te pliki do głównego folderu z komponentami note.

  Jesli masz porozrzucane i nie masz modułu na to, wrzucasz je do folderu parenta. Zauważyłem, że
  podzieliłeś to trochę biorąc pod uwagę route'y. W sumie spoko, ale ja i tak bym to wrzucił do jednego modułu.

  Staraj się używać angular styleguide, linkwałem go w paru miejscach. Bardzo zaplusujesz w oczach technicznego rekrutera.

  Header czy pagenotfoud mógłbyś wrzucić do modułu @core, do modułu @shared wrzuca się raczej funkcjonalności, które renderują
  się dynamicznie. Header jest statycznym elementem stronki.
*/
