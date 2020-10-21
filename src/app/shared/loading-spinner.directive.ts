import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoadingSpinner]'
})
export class LoadingSpinnerDirective implements OnInit {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    const div = this.renderer.createElement('div');

    for (let i = 0; i < 4; i++) {
      this.renderer.appendChild(this.elementRef.nativeElement, div);
      this.renderer.parentNode(this.elementRef);
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'lds-ring');
  }

}
