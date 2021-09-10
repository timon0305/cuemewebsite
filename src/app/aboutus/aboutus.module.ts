import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusRoutingModule } from './aboutus-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';

import { AboutusComponent } from './aboutus.component';

@NgModule({
  imports: [
    CommonModule,
    AboutusRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule
  ],
  declarations: [
    AboutusComponent  ]
})
export class AboutusModule { }
