import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StripeNodeService {
    constructor(private http: HttpClient) { }

    async insertPaymentIntent(amount: number, customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'amount': amount, 'currency': 'USD', 'payment_method_types': ['card'], 'customer': customerId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/createPaymentIntent', body, { headers: reqHeader }).toPromise() as any;
    }

    async confirmPaymentIntent(paymentIntentId: string, payment_method: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'paymentIntentId': paymentIntentId, "payment_method": payment_method }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/confirmPaymentIntent', body, { headers: reqHeader }).toPromise() as any;
    }

    async getStripeCustomer(customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/getStripeCustomer', body, { headers: reqHeader }).toPromise() as any;
    }

    async getCustomerPaymentMethod(customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/getCustomerPaymentMethod', body, { headers: reqHeader }).toPromise() as any;
    }

    async insertStripeCustomer(email: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'email': email }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertStripeCustomer', body, { headers: reqHeader }).toPromise() as any;
    }
    async insertPaymentMethod(number: string, expMonth: number, expYear: number, cvc: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'number': number, 'expMonth': expMonth, 'expYear': expYear, 'cvc': cvc }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertPaymentMethod', body, { headers: reqHeader }).toPromise() as any;
    }

    async attachPaymentMethodToCustomer(id: string, customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'id': id, 'customerId': customerId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/attachPaymentMethodToCustomer', body, { headers: reqHeader }).toPromise() as any;
    }

    async detachPaymentMethosToCustomer(paymentMethosId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'paymentMethosId': paymentMethosId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/detachPaymentMethosToCustomer', body, { headers: reqHeader }).toPromise() as any;
    }

    async getSubscriptionList(customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/getSubscriptions', body, { headers: reqHeader }).toPromise() as any;
    }

    async deleteSubscriptions(id: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'id': id }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/deleteSubscriptions', body, { headers: reqHeader }).toPromise() as any;
    }

    async insertProduct(name: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'name': name }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertProduct', body, { headers: reqHeader }).toPromise() as any;
    }

    async insertPrice(amount: number, productId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'amount': amount, 'productId': productId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertPrice', body, { headers: reqHeader }).toPromise() as any;
    }

    async insertSubscription(customerId: string, priceId: string, default_payment_method: string, cuponId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId, 'priceId': priceId, "default_payment_method": default_payment_method, "coupon": cuponId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertSubscription', body, { headers: reqHeader }).toPromise() as any;
    }

    async updateCustomer(customerId: string, paymentMethidId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId, 'paymentMethidId': paymentMethidId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/updateCustomer', body, { headers: reqHeader }).toPromise() as any;
    }

    async getStripeCouponList(token: string): Promise<any> {
        // var body = JSON.parse(JSON.stringify({ 'customerId': customerId, 'paymentMethidId': paymentMethidId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/getStripeCouponList', {}, { headers: reqHeader }).toPromise() as any;
    }

    async insertStripeCouponPer(name: string, duration: string, percent_off: number, token: string, max_redemptions?: number, redeem_by?: number): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'name': name, 'duration': duration, 'percent_off': percent_off, 'max_redemptions': max_redemptions, 'redeem_by': redeem_by }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertStripeCouponPer', body, { headers: reqHeader }).toPromise() as any;
    }

    async insertStripeCouponAmt(name: string, duration: string, amount_off: number, token: string, max_redemptions?: number, redeem_by?: number): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'name': name, 'duration': duration, 'amount_off': amount_off, 'max_redemptions': max_redemptions, 'redeem_by': redeem_by }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/insertStripeCouponAmt', body, { headers: reqHeader }).toPromise() as any;
    }

    async deleteStripeCoupon(couponId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'couponId': couponId }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/deleteStripeCoupon', body, { headers: reqHeader }).toPromise() as any;
    }

    async getCustomerPaymentIntent(customer: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({'customer': customer }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/getCustomerPaymentIntent', body, { headers: reqHeader }).toPromise() as any;
    }

    async createCharge(amount: number, customer: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'amount': amount, 'customer': customer }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/createCharge', body, { headers: reqHeader }).toPromise() as any;
    }

    async createRefund(amount: number,payment_intent:string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'amount': amount,'payment_intent':payment_intent }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/stripes/createRefund', body, { headers: reqHeader }).toPromise() as any;
    }

    // async payWithNewCard(userCred: any, amount: number, cardDetails: CardDetails, currency: string, subscription: Subscriptions, isSave: boolean, isSubscribe: boolean, isCartClear: boolean, token: string): Promise<any> {
    //     var customers;
    //     if (userCred == null || userCred.customerId == '') {
    //         customers = await this.stripeNodeService.insertStripeCustomer(userCred.email, token);
    //         await this.paymentGatewayService.insertPaymentGateway(customers['id'], token);
    //       }
          
    //       var paymentMethodsObject = await this.insertPaymentMethod(cardDetails.number, cardDetails.exp_month, cardDetails.exp_year, cardDetails.cvc, token);
    //       // ignore: unused_local_variable
    //       if (isSave) {
    //         // ignore: unused_local_variable
    //         var attach = await this.attachPaymentMethodToCustomer((userCred.customerId == null || userCred.customerId == '') ? customers["id"] : userCred.customerId, paymentMethodsObject["id"], token);
    //         if (userCred.customerId == null) {
    //           userCred.customerId = customers["id"];
    //         }
    //       }

    //       if (isSubscribe && subscription != null) {
    //         var couponCode;
    //         var subscriptionData = await this.subscriptionService.getUserSubscriptionById(userCred.customerId, token);
    //         var data = subscriptionData["data"];
    //         for (let i = 0; i < data.length; i++) {
    //           this.deleteSubscriptions(data[i]['id'], token);
    //         }
    //         var productCreated = await this.insertProduct('Package', token);
    //         var createPrice = await this.insertPrice(amount, currency, productCreated["id"]);
    //         if (discountCoupon != null) {
    //           var coupons = await this.getStripeCouponList(token);
    //           for (let i = 0; i < coupons["data"].length; i++) {
    //             if (discountCoupon.code == coupons["data"][i]["name"]) {
    //               couponCode = coupons["data"][i]["id"];
    //             }
    //           }
    //           await this.insertSubscription(userCred.customerId, createPrice["id"], paymentMethodsObject["id"], coupon: couponCode);
    //         } else {
    //           await this.insertSubscription(userCred.customerId,createPrice["id"], paymentMethodsObject["id"], coupon: null);
    //         }
    //         await apiHelper.updateStripeCustomers(cardId: paymentMethodsObject["id"], customerId: global.user.customerId);
    //       }
    // }

}