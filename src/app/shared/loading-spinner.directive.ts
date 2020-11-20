import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoadingSpinner]',
})
export class LoadingSpinnerDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, 'lds-ring');

    for (let i = 0; i < 4; i++) {
      const div = this.renderer.createElement('div');
      this.renderer.appendChild(this.elementRef.nativeElement, div);
    }
  }
}
