import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminforgotpasswordComponent } from './adminforgotpassword.component';
import { AdminForgotPasswordRoutingModule } from './adminforgotpassword-routing.module';
import { UserService } from '../service/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminForgotPasswordRoutingModule
    ],
    providers: [UserService],
    declarations: [AdminforgotpasswordComponent]
})
export class AdminForgotPasswordModule { }
