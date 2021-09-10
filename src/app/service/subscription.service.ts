import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserSubscription } from '../entities/stripe/usersubscription';
import { SubscriptionParameter, Subscriptions } from '../entities/subscription';

@Injectable({
    providedIn: 'root'
})

export class SubscriptionService {

    constructor(private http: HttpClient) { }

    async getSubscription(parameter: SubscriptionParameter, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/subscriptions/get", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async getUserSubscriptionById(id: number, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "id": id }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/usersubscriptions/getUserSubscriptionById", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async updateSubscription(parameter:Subscriptions, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.patch(environment.apiUrl + "/subscriptions/update", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async addSubscription(body: UserSubscription, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/usersubscriptions/add", body, { headers: reqHeader })
            .toPromise() as any;
    }
}