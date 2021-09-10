import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminforgotpasswordComponent } from './adminforgotpassword.component';

const routes: Routes = [
    {
        path: '',
        component: AdminforgotpasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminForgotPasswordRoutingModule {}