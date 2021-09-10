import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripecardsComponent } from './stripecards.component';

const routes: Routes = [
    {
        path: '',
        component: StripecardsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StripeCardsRoutingModule {}