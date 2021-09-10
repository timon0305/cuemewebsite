import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessscreenComponent } from './successscreen.component';

const routes: Routes = [
    {
        path: '',
        component: SuccessscreenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuccessScreenRoutingModule {}