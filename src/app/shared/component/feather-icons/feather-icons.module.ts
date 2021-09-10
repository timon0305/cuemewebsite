import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatherIconsComponent } from './feather-icons.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule
    ],
    declarations: [FeatherIconsComponent],
    exports: [FeatherIconsComponent],
    providers: []
  })
  export class FeatherIconsModule { }