import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPlayerRequestParameter } from 'src/app/entities/getplayerrequestparameter';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PlayerService {

    constructor(private http: HttpClient) { }

    async getPlayers(parameter: GetPlayerRequestParameter): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/players/getPlayerAdmin", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async getPlayerDetail(id: number, imageType: string, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "id": id, "imageType": imageType }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/players/getPlayerDetail", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async getVenue(parameter: GetPlayerRequestParameter): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": "CueMeAdmin" });
        return await this.http.post(environment.apiUrl + "/venues/getVenueAdmin", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async getVenueDetail(id: number, imageType: string, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "id": id, "imageType": imageType }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/venues/getVenueDetail", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async activeInactivePlayerAdmin(id: number, isActive: boolean, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "id": id, "isActive": isActive }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/players/activeInactivePlayerAdmin", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async removePlayerAdmin(id: number, isDelete: boolean, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "userId": id, "isDelete": isDelete }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/players/removePlayerAdmin", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async removePlayerSubscriptionAdmin(id: number, token: string): Promise<any> {
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.request("delete", environment.apiUrl + "/usersubscriptions/remove", { headers: reqHeader, body: { "id": id } })
            .toPromise() as any;
    }

    async getImagePlayerAdmin(imageId: number, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "imageId": imageId }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/players/getImagePlayerAdmin", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

    async getUserSubscriptionById(id: number, token: string): Promise<any> {
        let parameter = JSON.parse(JSON.stringify({ "id": id }));
        var reqHeader = new HttpHeaders({ "Authorization": token });
        return await this.http.post(environment.apiUrl + "/usersubscriptions/getUserSubscriptionById", parameter, { headers: reqHeader })
            .toPromise() as any;
    }

}