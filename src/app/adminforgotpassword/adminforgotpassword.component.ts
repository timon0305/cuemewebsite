import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-adminforgotpassword',
  templateUrl: './adminforgotpassword.component.html',
  styleUrls: ['./adminforgotpassword.component.scss']
})
export class AdminforgotpasswordComponent implements OnInit {

  public email: string;

  constructor(
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public async sendResetPasswordMail(form: NgForm) {
    try {
      this.spinnerService.show();
      let res = await this.userService.sendResetPasswordMail(this.email);
      if (res && res.status == 200)
        this.toastrService.success("Mail Send Successfully");
      this.spinnerService.hide();
    }
    catch (error) {
      this.spinnerService.hide();
      this.toastrService.error(error);
    }
  }

}
