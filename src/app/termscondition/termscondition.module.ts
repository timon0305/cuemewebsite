import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsconditionRoutingModule } from './termscondition-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TermsconditionComponent } from './termscondition.component';

@NgModule({
    imports: [
        CommonModule,
        TermsconditionRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        TermsconditionComponent
    ]
})
export class TermsconditionModule { }
