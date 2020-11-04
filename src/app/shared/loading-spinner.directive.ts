import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoadingSpinner]',
})
export class LoadingSpinnerDirective implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'lds-ring');

    for (let i = 0; i < 4; i++) {
      const div = this.renderer.createElement('div');
      this.renderer.appendChild(this.elementRef.nativeElement, div);
    }
  }
}
