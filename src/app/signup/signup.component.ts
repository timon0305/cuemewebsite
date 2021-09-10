import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../entities/user/login';
import { User } from '../entities/user/user';
import { LoginService } from '../service/login.service';
// declare let ClientIP: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public emailId: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public contact: string

  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private loginservice: LoginService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // ClientIP
    // ;
    var e = this.route.snapshot.paramMap.get('input_email');
    if (e)
    this.emailId = e;
  }

  public async signup(form: NgForm) {
    try {
      if (form.valid) {
        this.spinnerService.show();
        let parameter = new User();
        parameter.isOAuth = false;
        parameter.password = btoa(this.password);
        parameter.firstName = this.firstName;
        parameter.lastName = this.lastName;
        parameter.email = this.emailId;
        parameter.contactNo1 = this.contact;
        parameter.roleId = 0;
        let res: any = await this.loginservice.signup(parameter);
        if (res && res.status == 200) {
          if (res.recordList && res.recordList.length > 0) {
            sessionStorage.setItem("Credential", JSON.stringify(res.recordList[0]));
            sessionStorage.setItem("SessionToken", res.recordList[0].sessionToken);
            console.log(res.recordList[0].sessionToken);
            this.router.navigate(['appsubscription/' + res.recordList[0].sessionToken]);
          }
        }
        else if (res && res.status == 403) {
          this.toastrService.error(res.message, "Error")
        }
        // this.spinnerService.hide();
      }
      else {
        Object.keys(form.controls).forEach(key => {
          form.controls[key].markAsTouched();
        });
      }
    }
    catch (error) {
      this.spinnerService.hide();
      console.log(error);
      this.toastrService.error(error.error.message, "Error")
    }
  }

}
