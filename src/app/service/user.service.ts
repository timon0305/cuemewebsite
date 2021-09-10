import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user/user';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }


    async insertUser(user: User, token: string): Promise<any> {
        //let parameter = JSON.parse(JSON.stringify({ "name": name, "description": description }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/users/add", user, { headers: reqHeader })
            .toPromise() as any;
    }

    async updateuser(user: User, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.patch(environment.apiUrl + "/users/update", user, { headers: reqHeader })
            .toPromise() as any;
    }

    async deleteUser(id: number, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.request("delete", environment.apiUrl + "/users/remove", { headers: reqHeader, body: { "userId": id } })
            .toPromise() as any;
    }

    async activeInactiveUser(id: number, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "userId": id }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/users/toggleuseractive", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async validateUserSession(token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "sessionToken": token }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/users/validateusersession", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async setuserpassword(newPassword: string, token): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "newpassword": newPassword, "sessionToken": token }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/users/resetuserpassword", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async sendResetPasswordMail(email: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "email": email }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        console.log(email);
        return await this.http.post(environment.apiUrl + "/users/forgotpassword", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async checkEmailAvailabilityUpdate(email: string, id: number, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "email": email, "id": id }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/users/checkEmailAvailabilityUpdate", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

     async checkemailexist(email: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "email": email }));
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/users/checkemailexist", parameter, { headers: reqHeader })
            .toPromise() as any;
    }


    //API for Subscription
    async validateSession(token: string): Promise<any> {
        //let parameter = JSON.parse(JSON.stringify({ "newpassword": newPassword, "sessionToken": token }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/users/validateSession", {}, { headers: reqHeader })
            .toPromise() as any;
    }

}