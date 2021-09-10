import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DiscountCouponsService {
    constructor(private http: HttpClient) { }

    async validateCoupon(couponCode: string, amount: number, isSubscription: boolean, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'couponCode': couponCode, 'amount': amount, "isSubscription": isSubscription }));
        //var header = new HttpHeaders({ 'Authorization': 'Bearer sk_test_kU3cHKuOYqsieQZxFsKbQjan0062vxZgLj', 'Content-Type': 'application/x-www-form-urlencoded' })
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/discountcoupons/discountcouponvalid', body, { headers: reqHeader }).toPromise() as any;
    }

}