import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsubscriptionComponent } from './appsubscription.component';

const routes: Routes = [
    {
        path: '',
        component: AppsubscriptionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppSubscriptionRoutingModule {}