import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyPolicyComponent } from './privacypolicy.component';

// Routes
const routes: Routes = [
  { 
    path: '',
    component: PrivacyPolicyComponent,
    data: {
      title: "Privacy Policy - CueME",
      content: "CueME Website"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
