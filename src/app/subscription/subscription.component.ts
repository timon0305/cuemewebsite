import { Component, OnInit } from '@angular/core';
import { SubscriptionParameter, Subscriptions } from '../entities/subscription';
import { SubscriptionService } from '../service/subscription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SafeResourceUrl } from '@angular/platform-browser';
// declare let ClientIP: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  isShowModal: boolean;
  token: string;
  subscriptions: Subscriptions[];


  constructor(
    private subscriptionService: SubscriptionService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
    // public userCred: any,
  ) { }

  async ngOnInit() {
    // ClientIP
    // ;
    this.token = sessionStorage.getItem("SessionToken");
    this.getSubscriptions();
  }

  private async getSubscriptions() {
    try {
      this.spinnerService.show();
      let param = new SubscriptionParameter();
      param.isActive = true;
      let res = await this.subscriptionService.getSubscription(param, this.token);
      if (res && res.status == 200) {
        this.subscriptions = res.recordList;
        this.subscriptions.forEach(element => {
          element.isActive = element.isActive ? true : false;
          element.isDelete = element.isDelete ? true : false;
        });
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error);
    }
  }

  openPaymentModal(){
      this.isShowModal = true;  
  }

  // private async getUserCred() {
  //   if (sessionStorage.getItem("Credential")) {
  //     let cred = sessionStorage.getItem("Credential") as string;
  //     this.userCred = JSON.parse(cred);
  //   }
  // }

  private async payWithNewCard() {
    try {
      this.spinnerService.show();
      let param = new SubscriptionParameter();
      param.isActive = true;
      let res = await this.subscriptionService.getSubscription(param, this.token);
      if (res && res.status == 200) {
        this.subscriptions = res.recordList;
        this.subscriptions.forEach(element => {
          element.isActive = element.isActive ? true : false;
          element.isDelete = element.isDelete ? true : false;
        });
      }
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error);
    }
  }

}
