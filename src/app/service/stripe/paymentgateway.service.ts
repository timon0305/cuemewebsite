import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PaymentGatewayService {
    constructor(private http: HttpClient) { }

    async insertPaymentGateway(customerId: string, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'customerId': customerId }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/paymentgateway/add', body, { headers: reqHeader }).toPromise() as any;
    }

    async getCustomerPaymentIntent(id: number, token: string): Promise<any> {
        var body = JSON.parse(JSON.stringify({ 'id': id }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + '/paymentgateway/getUserPaymentGateway', body, { headers: reqHeader }).toPromise() as any;
    }

}