import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCollapse]',
  host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' },
})
export class CollapseDirective {
  @Input('appCollapse') collapsed = false;
}
