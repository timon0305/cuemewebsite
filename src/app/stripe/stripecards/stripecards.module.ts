import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StripecardsComponent } from './stripecards.component';
import { StripeCardsRoutingModule } from './stripecards-routing.module';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { StripeNodeService } from 'src/app/service/stripe/stripe.service';
import { UserService } from 'src/app/service/user.service';
import { SharedDirectiveModule } from 'src/app/shared/directives/shareddirecitve.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StripeCardsRoutingModule,
        SharedDirectiveModule,
    ],
    providers: [SubscriptionService, StripeNodeService, UserService],
    declarations: [StripecardsComponent]
})
export class StripeCardsModule { }