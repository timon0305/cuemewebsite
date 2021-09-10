import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardNumberComponent } from './card-number.component';
import { CardNumberRoutingModule } from './card-number-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { UiSwitchModule } from 'ngx-ui-switch';
import { StripeNodeService } from '../../service/stripe/stripe.service';
import { SubscriptionService } from '../../service/subscription.service';
import { PaymentGatewayService } from '../../service/stripe/paymentgateway.service';
import { UserService } from 'src/app/service/user.service';
import { SharedDirectiveModule } from 'src/app/shared/directives/shareddirecitve.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardNumberRoutingModule,
        SharedDirectiveModule,
        NgxStripeModule.forRoot('pk_live_51I3OKiFLNKNfgYRuT5DyB28pJXGpAxPWXStsOSWFONQQr8FlfWRDkt4Ec0gKmmZKizVgdcKpmjUSwtWWxdKaF5qO00u6gscpfb'),
        UiSwitchModule.forRoot({
            size: 'small',
            color: '#AB47BC',
            switchColor: '#ffffff',
            defaultBgColor: '#dddddd',
            defaultBoColor: '#ffffff',
            checkedLabel: 'Yes',
            uncheckedLabel: 'No',
            checkedTextColor: '#ffffff',
            uncheckedTextColor: '#821894'
        })
    ],
    providers: [SubscriptionService, StripeNodeService, UserService,PaymentGatewayService],
    declarations: [CardNumberComponent]
})
export class CardNumberModule { }