import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<h2>Page not found!</h2>`,
  styles: [`
  h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  `]
})
export class PageNotFoundComponent { }
