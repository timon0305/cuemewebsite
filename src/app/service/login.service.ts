import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../entities/user/login';
import { User } from '../entities/user/user';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) { }

    async login(credential: Login): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/users/login", credential, { headers: reqHeader })
            .toPromise() as any;
    }

    async signup(credential: User): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/users/signup", credential, { headers: reqHeader })
            .toPromise() as any;
    }

}