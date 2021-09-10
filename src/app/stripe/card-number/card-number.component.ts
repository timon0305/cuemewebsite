import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';

import { environment as env } from '../../../environments/environment';
import { StripeNodeService } from '../../service/stripe/stripe.service';
import { ValidateUser } from '../../entities/stripe/validateuser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscriptions } from '../../entities/subscription';
import { StripeCustomer } from '../../entities/stripe/stripecustomer';
import { PaymentGatewayService } from '../../service/stripe/paymentgateway.service';
import { UserSubscription } from '../../entities/stripe/usersubscription';
import { StripePaymentDetail } from '../../entities/stripe/stripepaymentdetail';
import { SubscriptionService } from '../../service/subscription.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-card-number',
  templateUrl: './card-number.component.html',
  styleUrls: ['./card-number.component.scss']
})
export class CardNumberComponent implements OnInit {

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest: FormGroup;

  public tokenUrl: string;
  public isValidateToken: boolean;
  public user: ValidateUser = new ValidateUser();
  public selectedSubscription: Subscriptions = new Subscriptions();
  public stripeCustomer: StripeCustomer = new StripeCustomer();

  public isSave: boolean;
  public isAutoSubscribe: boolean;

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService,
    private stripeNodeService: StripeNodeService,
    private paymentGatewayService: PaymentGatewayService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.selectedSubscription = JSON.parse(sessionStorage.getItem("Subscription")) as Subscriptions
    let sub = this.route.params.subscribe(async (params) => {
      this.tokenUrl = params['token']; // (+) converts string 'id' to a number
      await this.validateToken();
    });

    this.stripeTest = new FormGroup({
      //   'name': new FormControl('Angular v10', [Validators.required]),
      //   'amount': new FormControl(0, [Validators.required, Validators.pattern(/\d+/)]),
      'cardNumber': new FormControl('', [Validators.required]),
      'cardMonth': new FormControl('', [Validators.required]),
      'cardYear': new FormControl('', [Validators.required]),
      'cardCVC': new FormControl('', [Validators.required]),
      'cardName': new FormControl('', [Validators.required]),
      'isSave': new FormControl(false, [Validators.required]),
      'isSubscribe': new FormControl(false, [Validators.required]),
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

  public async paytest() {
    try {
      this.spinnerService.show();
      // if (this.stripeTest.valid) {
        if (this.selectedSubscription && this.selectedSubscription.id) {
          //let customer
          if (!this.user.customerId) {
            let res = await this.stripeNodeService.insertStripeCustomer(this.user.email, this.tokenUrl);
            if (res && res.status == 200) {
              this.stripeCustomer = res.recordList;
              let paymentGatewayRes = await this.paymentGatewayService.insertPaymentGateway(this.stripeCustomer.id, this.tokenUrl);
              if (paymentGatewayRes && paymentGatewayRes.status == 200) {

              }
            }
          }
          console.log("saddf322433333");
          let card = {
            number: this.stripeTest.value.cardNumber,
            exp_month: parseInt(this.stripeTest.value.cardMonth),
            exp_year: parseInt(this.stripeTest.value.cardYear),
            cvc: this.stripeTest.value.cardCVC,
          }
          // let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;

          // let cardRes = await this.stripeNodeService.insertPaymentMethod(card.number, card.exp_month, card.exp_year, card.cvc, this.tokenUrl);
          // if (cardRes && cardRes.status == 200) {
            // let paymentMethodsObject = cardRes.recordList;

            // if (this.stripeTest.value.isSave) {
            //   let res = await this.stripeNodeService.attachPaymentMethodToCustomer(paymentMethodsObject.id, this.user.customerId, this.tokenUrl);

            // }
            // let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;
            // if (this.stripeTest.value.isSubscribe) {
            //   let subRes = await this.stripeNodeService.getSubscriptionList(this.user.customerId, this.tokenUrl);
            //   if (subRes && subRes.status == 200) {
            //     let data = subRes.recordList;
            //     data.forEach(async (element) => {
            //       if (element.customer == this.user.customerId) {
            //         let relRes = await this.stripeNodeService.deleteSubscriptions(element.id, this.tokenUrl);
            //       }
            //     });
            //   }

            //   let productRes = await this.stripeNodeService.insertProduct('Package', this.tokenUrl);
            //   if (productRes && productRes.status == 200) {
            //     let amt = parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2));
            //     let priceRes = await this.stripeNodeService.insertPrice(amt, productRes.recordList.id, this.tokenUrl);
            //     if (priceRes && priceRes.status == 200) {
            //       let cuponId = null;
            //       if (discount && discount.code) {
            //         let couonRes = await this.stripeNodeService.getStripeCouponList(this.tokenUrl)
            //         if (couonRes && couonRes.status == 200) {
            //           couonRes.recordList.forEach(element => {
            //             if (element.name == discount.code) {
            //               cuponId = element.id;
            //             }
            //           });
            //         }
            //       }

            //       let subres = await this.stripeNodeService.insertSubscription(this.user.customerId, priceRes.recordList.id, paymentMethodsObject.id, cuponId, this.tokenUrl);
            //       if (subres && subres.status == 200) {
            //         let cusRes = await this.stripeNodeService.updateCustomer(this.user.customerId, paymentMethodsObject.id, this.tokenUrl);
            //       }
            //     }
            //   }

            // }
            let amt = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
            if (amt == 0) {
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

              // userSubscription.couponId = discount.id;
              // userSubscription.couponCode = discount.code;
              // userSubscription.couponAmount = discount.discountAmount;
              console.log("saddfasdf");
              let res = await this.subscriptionService.addSubscription(userSubscription, this.tokenUrl);
              if (res && res.status == 200) {
                //Success Screeen and redirect to App
                this.router.navigate(['success']);
              }
            }
            else {
              // let res = await this.createPaymentIntent(amt, this.user.customerId);
              // if (res && res.status == 200) {
                // let conres = await this.stripeNodeService.confirmPaymentIntent(res.recordList.id, paymentMethodsObject.id, this.tokenUrl);
                // if (conres && conres.status == 200) {
                  // if (conres.recordList.status == "succeeded") {
                    let userSubscription = new UserSubscription();
                    userSubscription.subscriptionAmount = parseFloat((this.selectedSubscription.orgAmount ).toFixed(2));
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

                    // userSubscription.couponId = discount ? discount.id : null;
                    // userSubscription.couponCode = discount ? discount.code : null;
                    // userSubscription.couponAmount = discount ? discount.discountAmount : null;
                    console.log("saddf3224");
                    let finalres = await this.subscriptionService.addSubscription(userSubscription, this.tokenUrl);
                    if (finalres && finalres.status == 200) {
                      //Success Screeen and redirect to App
                      this.router.navigate(['success']);

                    }
                  // }
                // }
              // }
            }
          }
        // }
        // else {
        //   this.toastrService.warning("Subscription not selected");
        // }
      // } else {
      //   console.log("saddf3224vvvvvvvv");
      //   console.log(this.stripeTest);
      // }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error);
    }

  }


  public async pay() {
    try {
      this.spinnerService.show();
      if (this.stripeTest.valid) {
        if (this.selectedSubscription && this.selectedSubscription.id) {
          //let customer
          if (!this.user.customerId) {
            let res = await this.stripeNodeService.insertStripeCustomer(this.user.email, this.tokenUrl);
            if (res && res.status == 200) {
              this.stripeCustomer = res.recordList;
              let paymentGatewayRes = await this.paymentGatewayService.insertPaymentGateway(this.stripeCustomer.id, this.tokenUrl);
              if (paymentGatewayRes && paymentGatewayRes.status == 200) {

              }
            }
          }
          
          let card = {
            number: this.stripeTest.value.cardNumber,
            exp_month: parseInt(this.stripeTest.value.cardMonth),
            exp_year: parseInt(this.stripeTest.value.cardYear),
            cvc: this.stripeTest.value.cardCVC,
          }
          let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;

          let cardRes = await this.stripeNodeService.insertPaymentMethod(card.number, card.exp_month, card.exp_year, card.cvc, this.tokenUrl);
          if (cardRes && cardRes.status == 200) {
            let paymentMethodsObject = cardRes.recordList;

            if (this.stripeTest.value.isSave) {
              let res = await this.stripeNodeService.attachPaymentMethodToCustomer(paymentMethodsObject.id, this.user.customerId, this.tokenUrl);

            }
            let discount = JSON.parse(sessionStorage.getItem("DiscountCoupon")) as any;
            if (this.stripeTest.value.isSubscribe) {
              let subRes = await this.stripeNodeService.getSubscriptionList(this.user.customerId, this.tokenUrl);
              if (subRes && subRes.status == 200) {
                let data = subRes.recordList;
                data.forEach(async (element) => {
                  if (element.customer == this.user.customerId) {
                    let relRes = await this.stripeNodeService.deleteSubscriptions(element.id, this.tokenUrl);
                  }
                });
              }

              let productRes = await this.stripeNodeService.insertProduct('Package', this.tokenUrl);
              if (productRes && productRes.status == 200) {
                let amt = parseFloat((this.selectedSubscription.orgAmount * 100).toFixed(2));
                let priceRes = await this.stripeNodeService.insertPrice(amt, productRes.recordList.id, this.tokenUrl);
                if (priceRes && priceRes.status == 200) {
                  let cuponId = null;
                  if (discount && discount.code) {
                    let couonRes = await this.stripeNodeService.getStripeCouponList(this.tokenUrl)
                    if (couonRes && couonRes.status == 200) {
                      couonRes.recordList.forEach(element => {
                        if (element.name == discount.code) {
                          cuponId = element.id;
                        }
                      });
                    }
                  }

                  let subres = await this.stripeNodeService.insertSubscription(this.user.customerId, priceRes.recordList.id, paymentMethodsObject.id, cuponId, this.tokenUrl);
                  if (subres && subres.status == 200) {
                    let cusRes = await this.stripeNodeService.updateCustomer(this.user.customerId, paymentMethodsObject.id, this.tokenUrl);
                  }
                }
              }

            }
            let amt = parseFloat((this.selectedSubscription.amount * 100).toFixed(2));
            if (amt == 0) {
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
              let res = await this.createPaymentIntent(amt, this.user.customerId);
              if (res && res.status == 200) {
                let conres = await this.stripeNodeService.confirmPaymentIntent(res.recordList.id, paymentMethodsObject.id, this.tokenUrl);
                if (conres && conres.status == 200) {
                  if (conres.recordList.status == "succeeded") {
                    let userSubscription = new UserSubscription();
                    userSubscription.subscriptionAmount = parseFloat((this.selectedSubscription.orgAmount ).toFixed(2));
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
        }
        else {
          this.toastrService.warning("Subscription not selected");
        }
      } else {
        console.log(this.stripeTest);
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

  public redirectToSubscriptionList() {
    this.router.navigate(['appsubscription/' + this.tokenUrl]);
  }

}
