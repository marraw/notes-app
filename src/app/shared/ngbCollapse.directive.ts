import { Directive, Input } from '@angular/core';

/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
@Directive({
  // The selector should be prefixed by "app" (https://angular.io/guide/styleguide#style-02-08) (directive-selector)tslint(1)
  selector: '[ngbCollapse]',
  exportAs: 'ngbCollapse',
  /*
    Use @HostBinding or
    @HostListener rather than the `host` metadata property (https://angular.io/styleguide#style-06-03)
    (no-host-metadata-property)tslint(1)

    Tja, to jest jakby wyższy level więc potraktuj to jako miły dodatek :)
  */
  host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
})
/*
  The name of the class NgbCollapse should end with the suffix Directive
  (https://angular.io/styleguide#style-02-03) (directive-class-suffix)tslint(1)
  przykład: NgbCollapseDirective
*/
export class NgbCollapse {
  /**
   * If `true`, will collapse the element or show it otherwise.
   */
  @Input('ngbCollapse') collapsed = false;
}
