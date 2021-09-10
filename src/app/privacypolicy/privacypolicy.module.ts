import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyRoutingModule } from './privacypolicy-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';

import { PrivacyPolicyComponent } from './privacypolicy.component';

@NgModule({
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule
  ],
  declarations: [
    PrivacyPolicyComponent
  ]
})
export class PrivacyPolicyModule { }
