import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { LoginService } from '../service/login.service';

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule
    ],
    providers: [LoginService],
    declarations: [SignupComponent]
})
export class SignupModule { }
