import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToRedeemRoutingModule } from './howtoredeem-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HowToRedeemComponent } from './howtoredeem.component';

@NgModule({
    imports: [
        CommonModule,
        HowToRedeemRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        HowToRedeemComponent
    ]
})
export class HowToRedeemModule { }
