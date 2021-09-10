import { Component, getModuleFactory, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscriptions } from '../entities/subscription';
import { SubscriptionParameter } from '../entities/subscriptionparameter';
import { SubscriptionService } from '../service/subscription.service';
import { PlayerService } from '../shared/services/player.service';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-playerdetail',
  templateUrl: './playerdetail.component.html',
  styleUrls: ['./playerdetail.component.scss']
})
export class PlayerdetailComponent implements OnInit {

  public active: number = 1;
  public token: string
  public playerDetail: any;
  public user_photo: SafeResourceUrl;
  public selectedMatches: any[] = [];
  public selectedTournament: any[] = [];
  private base64abc = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
  ];

  public playerId: number;

  public isSubscriptionDialog: boolean;
  public subscriptions: Subscriptions[];
  public selectedSubscription: Subscriptions = new Subscriptions();
  public fromDate: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  public payRef: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private playerService: PlayerService,
    private domSanitizer: DomSanitizer,
    private subscriptionService: SubscriptionService) { }

  async ngOnInit() {
    this.token = sessionStorage.getItem("SessionToken");
    let sub = this.route.params.subscribe(async (params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.playerId = id
      await this.getPlayerDetail(id);
    });
    await this.getSubscriptions();
  }

  public navigateHome() {
    this.router.navigate(['dashboard']);
  }

  private async getPlayerDetail(id: number) {
    try {
      this.spinnerService.show();
      let res = await this.playerService.getPlayerDetail(id, "thumbImg", this.token);
      if (res && res.status == 200 && res.recordList) {
        this.playerDetail = res.recordList[0];

        if (this.playerDetail.contactNo1) {
          let cno1 = JSON.parse(JSON.stringify(this.playerDetail.contactNo1));
          this.playerDetail.contactNo1 = "";
          for (let j = 0; j < cno1.length; j++) {
            this.playerDetail.contactNo1 += cno1[j];
            if (j == 2) {
              this.playerDetail.contactNo1 += "-";
            }
            else if (j == 5) {
              this.playerDetail.contactNo1 += "-";
            }
          }
        }
        
        // for (let i = 0; i < this.playerDetail.friends.length; i++) {
        //   if (this.playerDetail.friends[i].contactNo1) {
        //     let cno1 = JSON.parse(JSON.stringify(this.playerDetail.friends[i].contactNo1));
        //     this.playerDetail.friends[i].contactNo1 = "";
        //     for (let j = 0; j < cno1.length; j++) {
        //       this.playerDetail.friends[i].contactNo1 += cno1[j];
        //       if (j == 2) {
        //         this.playerDetail.friends[i].contactNo1 += "-";
        //       }
        //       else if (j == 5) {
        //         this.playerDetail.friends[i].contactNo1 += "-";
        //       }
        //     }
        //   }
        // }
        
        // for (let i = 0; i < this.playerDetail.follower.length; i++) {
        //   if (this.playerDetail.follower[i].contactNo1) {
        //     let cno1 = JSON.parse(JSON.stringify(this.playerDetail.follower[i].contactNo1));
        //     this.playerDetail.follower[i].contactNo1 = "";
        //     for (let j = 0; j < cno1.length; j++) {
        //       this.playerDetail.follower[i].contactNo1 += cno1[j];
        //       if (j == 2) {
        //         this.playerDetail.follower[i].contactNo1 += "-";
        //       }
        //       else if (j == 5) {
        //         this.playerDetail.follower[i].contactNo1 += "-";
        //       }
        //     }
        //   }
        // }
        // for (let i = 0; i < this.playerDetail.following.length; i++) {
        //   if (this.playerDetail.following[i].contactNo1) {
        //     let cno1 = JSON.parse(JSON.stringify(this.playerDetail.following[i].contactNo1));
        //     this.playerDetail.following[i].contactNo1 = "";
        //     for (let j = 0; j < cno1.length; j++) {
        //       this.playerDetail.following[i].contactNo1 += cno1[j];
        //       if (j == 2) {
        //         this.playerDetail.following[i].contactNo1 += "-";
        //       }
        //       else if (j == 5) {
        //         this.playerDetail.following[i].contactNo1 += "-";
        //       }
        //     }
        //   }
        // }
        if (this.playerDetail.imgData && this.playerDetail.imgData.data) {
          let data = this.bytesToBase64(this.playerDetail.imgData.data);
          this.user_photo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:' + this.playerDetail.imageType + ';base64' + ',' + data)
        }
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error.error.message, "Error")
    }
  }

  private bytesToBase64(bytes) {
    let result = '', i, l = bytes.length;
    for (i = 2; i < l; i += 3) {
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += this.base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
      result += this.base64abc[bytes[i] & 0x3F];
    }
    if (i === l + 1) { // 1 octet yet to write
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[(bytes[i - 2] & 0x03) << 4];
      result += "==";
    }
    if (i === l) { // 2 octets yet to write
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += this.base64abc[(bytes[i - 1] & 0x0F) << 2];
      result += "=";
    }
    return result;
  }

  public onMatchSelect({ selected }) {
    this.viewMatchDetail(selected[0].matchId);
  }

  public viewMatchDetail(id: number): void {
    this.router.navigate(['matchDetail/' + id]);
  }

  public onTournamentSelect({ selected }) {
    this.viewTournamentDetail(selected[0].id);
  }

  public viewTournamentDetail(id: number): void {
    this.router.navigate(['tournamentDetail/' + id]);
  }

  public deleteSubscription(data: any) {
    //let active = this.players.find(c => c.id == data.id).isActive == true ? "Suspend" : "Active";
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Subscription",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        try {
          this.spinnerService.show();

          let res = await this.playerService.removePlayerSubscriptionAdmin(data.id, this.token);
          if (res && res.status == 200) {
            await this.getPlayerDetail(data.userId);
            this.router.navigate(['home']);
          }
          else
            this.toastrService.error(res.error, "Error")
          this.spinnerService.hide();
        }
        catch (error) {
          this.spinnerService.hide();
          this.toastrService.error(error.message, "Error");
        }
      }
    });
  }

  private async getSubscriptions() {
    try {
      let param = new SubscriptionParameter();
      param.isActive = true;
      let res = await this.subscriptionService.getSubscription(param, this.token);
      if (res && res.status == 200) {
        this.subscriptions = res.recordList;
      }
    }
    catch (error) {

    }
  }

  public validateDate() {
    if (this.fromDate && this.fromDate.day) {
    }
    else if (this.fromDate && this.fromDate.length == 10) {
      let dt = this.fromDate.split("/");
      this.fromDate = { year: parseInt(dt[2]), month: parseInt(dt[0]), day: parseInt(dt[1]) }
    }
  }

  public closeSubscriptionDialog() {
    this.isSubscriptionDialog = false;
  }

}