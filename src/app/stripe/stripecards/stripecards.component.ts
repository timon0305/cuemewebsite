import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StripeCards } from 'src/app/entities/stripe/stripecards';
import { StripeCustomer } from 'src/app/entities/stripe/stripecustomer';
import { StripePaymentDetail } from 'src/app/entities/stripe/stripepaymentdetail';
import { UserSubscription } from 'src/app/entities/stripe/usersubscription';
import { ValidateUser } from 'src/app/entities/stripe/validateuser';
import { Subscriptions } from 'src/app/entities/subscription';
import { PaymentGatewayService } from 'src/app/service/stripe/paymentgateway.service';
import { StripeNodeService } from 'src/app/service/stripe/stripe.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-stripecards',
  templateUrl: './stripecards.component.html',
  styleUrls: ['./stripecards.component.scss']
})
export class StripecardsComponent implements OnInit {

  public tokenUrl: string;
  public isValidateToken: boolean;
  public user: ValidateUser = new ValidateUser();
  public customerCards: StripeCards[];
  public stripeCustomer: StripeCustomer = new StripeCustomer();
  public selectedSubscription: Subscriptions = new Subscriptions();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService,
    private stripeNodeService: StripeNodeService,
    private paymentGatewayService: PaymentGatewayService,
    private subscriptionService: SubscriptionService
  ) { }

  async ngOnInit() {
    this.selectedSubscription = JSON.parse(sessionStorage.getItem("Subscription")) as Subscriptions
    let sub = this.route.params.subscribe(async (params) => {
      this.tokenUrl = params['token']; // (+) converts string 'id' to a number
      await this.validateToken();
    });
  }

  public async validateToken() {
    try {
      let validate = JSON.parse(sessionStorage.getItem("ValidateUser")) as ValidateUser;
      if (!(validate && validate.id)) {
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
          window.location.href = 'https://cueme.com';
          this.isValidateToken = false;
        }
        this.spinnerService.hide();
      }
      else {
        this.user = validate;
        this.isValidateToken = true;
      }
      if (this.isValidateToken) {
        await this.getStripeCustomer();
        await this.checkCardAvailable();
      }
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public async getStripeCustomer() {
    try {
      this.spinnerService.show();
      let res = await this.stripeNodeService.getStripeCustomer(this.user.customerId, this.tokenUrl);
      if (res && res.status == 200) {
        this.stripeCustomer = res.recordList;
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
    }
  }

  public async checkCardAvailable() {
    try {
      this.spinnerService.show();
      let res = await this.stripeNodeService.getCustomerPaymentMethod(this.user.customerId, this.tokenUrl);
      if (res && res.status == 200) {
        if (res.recordList && res.recordList.data && res.recordList.data.length > 0) {
          this.customerCards = res.recordList.data;
          if (this.stripeCustomer && this.stripeCustomer.metadata && this.stripeCustomer.metadata.payment_method_id) {
            this.customerCards.forEach(element => {
              if (element.id == this.stripeCustomer.metadata.payment_method_id) {
                element.isDefault = true;
              }
              else {
                element.isDefault = false;
              }
            });
          }
        }
        else {
          this.router.navigate(['cardnumber'])
        }
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public async payViaExistingCard(card: StripeCards) {
    try {
      this.spinnerService.show();
      if (this.selectedSubscription && this.selectedSubscription.id) {
        if (this.selectedSubscription.amount == 0) {
          let userSubscription = new UserSubscription();
          userSubscription.subscriptionAmount = parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2));
          userSubscription.subscriptionId = this.selectedSubscription.id;
          userSubscription.subscriptionName = this.selectedSubscription.name;
          userSubscription.toDate = new Date(new Date().setDate(new Date().getDate() + 30))
          userSubscription.fromDate = new Date();
          userSubscription.subscriptionValidityMeasurement = this.selectedSubscription.validityMeasurement;
          userSubscription.subscriptionTermsAndCondition = this.selectedSubscription.termsAndCondition;
          userSubscription.payments.amount = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
          userSubscription.payments.paymentStatusId = 2;
          userSubscription.payments.paymentTypeId = 1;
          userSubscription.payments.transactionDate = new Date();
          userSubscription.payments.paymentDetails = new Array<StripePaymentDetail>();
          let pDetail = new StripePaymentDetail();
          pDetail.amount = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
          pDetail.paymentModeId = 2;
          pDetail.paymentRefNumber = "cueme";
          userSubscription.payments.paymentDetails.push(pDetail);
          //userSubscription.payments.paymentDetailList.push({amount: parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2)), paymentModeId: 2, paymentRefNumber: "cueme"});
          let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;
          userSubscription.couponId = discount.id;
          userSubscription.couponCode = discount.code;
          userSubscription.couponAmount = discount.discountAmount;
          let res = await this.subscriptionService.addSubscription(userSubscription, this.tokenUrl);
          if (res && res.status == 200) {
            //Success Screeen and redirect to App
            this.router.navigate(['success']);
          }
        }
        else {
          let res = await this.createPaymentIntent(parseFloat((this.selectedSubscription.amount * 100).toFixed(2)), this.user.customerId);
          if (res && res.status == 200) {
            let conres = await this.stripeNodeService.confirmPaymentIntent(res.recordList.id, card.id, this.tokenUrl);
            if (conres && conres.status == 200) {
              if (conres.recordList.status == "succeeded") {
                let userSubscription = new UserSubscription();
                userSubscription.subscriptionAmount = parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2));
                userSubscription.subscriptionId = this.selectedSubscription.id;
                userSubscription.subscriptionName = this.selectedSubscription.name;
                userSubscription.toDate = new Date(new Date().setDate(new Date().getDate() + 30))
                userSubscription.fromDate = new Date();
                userSubscription.subscriptionValidityMeasurement = this.selectedSubscription.validityMeasurement;
                userSubscription.subscriptionTermsAndCondition = this.selectedSubscription.termsAndCondition;
                userSubscription.payments.amount = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
                userSubscription.payments.paymentStatusId = 2;
                userSubscription.payments.paymentTypeId = 1;
                userSubscription.payments.transactionDate = new Date();
                userSubscription.payments.paymentDetails = new Array<StripePaymentDetail>();
                let pDetail = new StripePaymentDetail();
                pDetail.amount = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
                pDetail.paymentModeId = 2;
                pDetail.paymentRefNumber = "cueme";
                userSubscription.payments.paymentDetails.push(pDetail);
                //userSubscription.payments.paymentDetailList.push({amount: parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2)), paymentModeId: 2, paymentRefNumber: "cueme"});
                let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;
                userSubscription.couponId = discount ? discount.id : null;
                userSubscription.couponCode = discount ? discount.code : null;
                userSubscription.couponAmount = discount ? discount.discountAmount : null;
                let finalres = await this.subscriptionService.addSubscription(userSubscription, this.tokenUrl);
                if (finalres && finalres.status == 200) {
                  //Success Screeen and redirect to App
                  this.router.navigate(['success']);
                }
              }
            }
          }
        }
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error);
    }

  }

  async createPaymentIntent(amount: number, customerId: string) {
    //var body = JSON.parse(JSON.stringify({ 'amount': amount, 'currency': 'USD', 'payment_method_types': ['card'], 'customer': 'cus_JKbnRqWsqBl4bQ' }));
    //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
    let res = await this.stripeNodeService.insertPaymentIntent(amount, customerId, this.tokenUrl)//this.http.post('http://localhost:8081/twitDM/get', body, { headers: header }).toPromise() as any;
    return res;
  }

  public async detachCustomerPaymentMethods(card: StripeCards) {
    try {
      this.spinnerService.show();
      let res = await this.stripeNodeService.detachPaymentMethosToCustomer(card.id, this.tokenUrl);
      if (res && res.status == 200)
        await this.checkCardAvailable();
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message);
    }
  }

  public redirectToNewCard() {
    this.router.navigate(['cardnumber/' + this.tokenUrl]);
  }

  public redirectToSubscriptionList() {
    this.router.navigate(['appsubscription/' + this.tokenUrl]);
  }

}
