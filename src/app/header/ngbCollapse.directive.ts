import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngbCollapse]',
  exportAs: 'ngbCollapse',
  host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
})
export class NgbCollapseDirective {
  @Input('ngbCollapse') collapsed = false;

}
