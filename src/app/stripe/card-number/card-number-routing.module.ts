import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardNumberComponent } from './card-number.component';

const routes: Routes = [
    {
        path: '',
        component: CardNumberComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardNumberRoutingModule {}