import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SubscriptionRoutingModule,
        FormsModule
    ],
    providers: [],
    declarations: [SubscriptionComponent]
})
export class SubscriptionModule { }
