import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class HomeService {

    constructor(private http: HttpClient) { }

    async getFAQ(): Promise<any> {
        // let parameter = JSON.parse(JSON.stringify({ "categoryName":categoryName, "description": displayOrder }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/fAQs/getFAQWebsite", {}, { headers: reqHeader })
            .toPromise() as any;
    }

    async sendGetInTouchEmail(name: string, description: string, email: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "name": name, "description": description, "email": email }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/sendreportproblem/sendGetInTouchEmail", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

}