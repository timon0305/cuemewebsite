import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToRedeemComponent } from './howtoredeem.component';

// Routes
const routes: Routes = [
  { 
    path: '',
    component: HowToRedeemComponent,
    data: {
      title: "HowToRedeem - CueME",
      content: "CueME Website"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowToRedeemRoutingModule { }
