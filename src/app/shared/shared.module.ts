import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollapseDirective } from './collapse.directive';
import { LoadingSpinnerDirective } from './loading-spinner.directive';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    CollapseDirective,
    LoadingSpinnerDirective,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    CollapseDirective,
    LoadingSpinnerDirective,
    ShortenPipe
  ]
})
export class SharedModule { }
