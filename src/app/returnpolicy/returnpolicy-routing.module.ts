import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnpolicyComponent } from './returnpolicy.component';

// Routes
const routes: Routes = [
  { 
    path: '',
    component: ReturnpolicyComponent,
    data: {
      title: "Refund Policy - CueME",
      content: "CueME Website"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnpolicyRoutingModule { }
