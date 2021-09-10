import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus.component';


// Routes
const routes: Routes = [
  { 
    path: '',
    component: AboutusComponent,
    data: {
      title: "AboutUs - CueME",
      content: "CueME Website"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
