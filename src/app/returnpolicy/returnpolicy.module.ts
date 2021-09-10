import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnpolicyRoutingModule } from './returnpolicy-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnpolicyComponent } from './returnpolicy.component';

@NgModule({
    imports: [
        CommonModule,
        ReturnpolicyRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        ReturnpolicyComponent
    ]
})
export class ReturnpolicyModule { }
