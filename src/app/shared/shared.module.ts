import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CollapseDirective } from './collapse.directive';
import { LoadingSpinnerDirective } from './loading-spinner.directive';
import { ShortenPipe } from './shorten.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    CollapseDirective,
    LoadingSpinnerDirective,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CommonModule,
    RouterModule,
    CollapseDirective,
    LoadingSpinnerDirective,
    ShortenPipe
  ]
})
export class SharedModule { }
