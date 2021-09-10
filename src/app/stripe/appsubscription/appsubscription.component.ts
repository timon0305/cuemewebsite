import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionParameter } from 'src/app/entities/subscriptionparameter';
import { Subscriptions } from 'src/app/entities/subscription';
import { ValidateUser } from '../../entities/stripe/validateuser';
import { UserService } from 'src/app/service/user.service';
import { SubscriptionService } from '../../service/subscription.service';
import { DiscountCouponsService } from '../../service/stripe/discountcoupons.service';
import { PaymentGatewayService } from '../../service/stripe/paymentgateway.service';
import { StripeNodeService } from '../../service/stripe/stripe.service';

@Component({
  selector: 'app-appsubscription',
  templateUrl: './appsubscription.component.html',
  styleUrls: ['./appsubscription.component.scss']
})
export class AppsubscriptionComponent implements OnInit {

  public tokenUrl: string;
  public isValidateToken: boolean;
  public user: ValidateUser = new ValidateUser();
  public subscriptions: Subscriptions[];
  public promocode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private discountCouponService: DiscountCouponsService,
    private stripeNodeService: StripeNodeService,
    private paymentGatewayService: PaymentGatewayService
  ) { }

  async ngOnInit() {
    sessionStorage.clear();
    let sub = this.route.params.subscribe(async (params) => {
      this.tokenUrl = params['token']; // (+) converts string 'id' to a number
      await this.validateToken();
    });
  }

  public async validateToken() {
    try {
      this.spinnerService.show();
      let res = await this.userService.validateSession(this.tokenUrl);
      if (res && res.status == 200) {
        this.isValidateToken = true;
        this.user = res.recordList;
        if (!this.user.customerId) {
          let res = await this.stripeNodeService.insertStripeCustomer(this.user.email, this.tokenUrl);
          if (res && res.status == 200) {
            let stripeCustomer = res.recordList;
            this.user.customerId = stripeCustomer.id;
            let paymentGatewayRes = await this.paymentGatewayService.insertPaymentGateway(stripeCustomer.id, this.tokenUrl);
            if (paymentGatewayRes && paymentGatewayRes.status == 200) {

            }
          }
        }
        sessionStorage.setItem("ValidateUser", JSON.stringify(this.user));
      }
      else {
        this.isValidateToken = false;
        window.location.href = 'https://cueme.com';
      }
      this.spinnerService.hide();
      if (this.isValidateToken)
        await this.getSubscription();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public async getSubscription() {
    try {
      this.spinnerService.show();
      let param = new SubscriptionParameter();
      param.isActive = true;
      let res = await this.subscriptionService.getSubscription(param, this.tokenUrl);
      if (res && res.status == 200) {
        this.subscriptions = res.recordList;
        this.subscriptions.forEach(element => {
          element.isActive = element.isActive ? true : false;
          element.isDelete = element.isDelete ? true : false;
        });
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public async validatePromoCode(promoCode: string) {
    try {
      this.spinnerService.show();
      let res = await this.discountCouponService.validateCoupon(this.promocode, 0, true, this.tokenUrl);
      if (res && res.status == 200) {
        let data = res.recordList[0];
        sessionStorage.setItem("DiscountCoupon", JSON.stringify(data));
        if (data.couponType == "Percentage") {
          this.subscriptions.forEach(element => {
            element.orgAmount = JSON.parse(JSON.stringify(element.amount));
            if (element.id == data.subscriptionId) {
              element.amount = element.amount - element.amount * parseFloat(data.discountAmount) / 100;
            }
          });
        }
        else {
          this.subscriptions.forEach(element => {
            element.orgAmount = JSON.parse(JSON.stringify(element.amount));
            if (element.id == data.subscriptionId) {
              element.amount = element.amount - parseFloat(data.discountAmount);
            }
          });
        }
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public clearCouponCode() {
    let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;
    if (discount.couponType == "Percentage") {
      this.subscriptions.forEach(element => {
        element.orgAmount = JSON.parse(JSON.stringify(element.amount));
        if (element.id == discount.subscriptionId) {
          element.amount = element.amount + element.amount * parseFloat(discount.discountAmount) / 100;
        }
      });
    }
    else {
      this.subscriptions.forEach(element => {
        element.orgAmount = JSON.parse(JSON.stringify(element.amount));
        if (element.id == discount.subscriptionId) {
          element.amount = element.amount + parseFloat(discount.discountAmount);
        }
      });
    }
    sessionStorage.removeItem("DiscountCoupon");
    this.promocode = null;
  }

  public async checkCardAvailable(subscription: Subscriptions) {
    try {
      this.spinnerService.show();
      let res = await this.stripeNodeService.getCustomerPaymentMethod(this.user.customerId, this.tokenUrl);
      if (res && res.status == 200) {
        subscription.orgAmount = JSON.parse(JSON.stringify(subscription.amount));
        sessionStorage.setItem("Subscription", JSON.stringify(subscription));
        if (res.recordList && res.recordList.data && res.recordList.data.length > 0) {
          this.router.navigate(['stripecards/' + this.tokenUrl])
        }
        else {
          this.router.navigate(['cardnumber/' + this.tokenUrl])
        }
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

}
