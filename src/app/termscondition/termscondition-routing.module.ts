import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsconditionComponent } from './termscondition.component';

// Routes
const routes: Routes = [
  { 
    path: '',
    component: TermsconditionComponent,
    data: {
      title: "Terms & Condition - CueME",
      content: "CueME Website"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsconditionRoutingModule { }
