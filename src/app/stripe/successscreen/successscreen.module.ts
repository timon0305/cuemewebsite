import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuccessscreenComponent } from './successscreen.component';
import { SuccessScreenRoutingModule } from './successscreen-routing.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/shareddirecitve.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SuccessScreenRoutingModule,
        SharedDirectiveModule,
    ],
    providers: [],
    declarations: [SuccessscreenComponent]
})
export class SuccessScreenModule { }