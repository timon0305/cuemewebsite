import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppsubscriptionComponent } from './appsubscription.component';
import { AppSubscriptionRoutingModule } from './appsubscription-routing.module';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { UserService } from 'src/app/service/user.service';
import { StripeNodeService } from 'src/app/service/stripe/stripe.service';
import { PaymentGatewayService } from 'src/app/service/stripe/paymentgateway.service';
import { DiscountCouponsService } from 'src/app/service/stripe/discountcoupons.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppSubscriptionRoutingModule,
        // SharedDirectiveModule,
    ],
    providers: [SubscriptionService, UserService, DiscountCouponsService, StripeNodeService, PaymentGatewayService],
    declarations: [AppsubscriptionComponent]
})
export class AppSubscriptionModule { }