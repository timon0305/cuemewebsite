import {Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, AfterViewInit {

  startUpForm: FormGroup;

  constructor(private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.startUpForm = this.fb.group({
      email: ['', Validators.email],
    });

  }

  async start() {
    try {
      if (this.startUpForm.value.email) {
      var isEmailExist = await this.checkEmailExist(this.startUpForm.value.email);
      if (isEmailExist) {
      this.router.navigate(['subscribe/', {input_email: this.startUpForm.value.email}]);
      } else {
      this.router.navigate(['signup/', {input_email: this.startUpForm.value.email}]);
      }
    }
    else {
      this.toastrService.error("Enter Email");
    }
   }
   catch (error) {
     this.toastrService.error("Invalid Email");
   }
  }

  async checkEmailExist(email: string) {
    try {
      var isEmailExist;
      let res: any = await this.userService.checkemailexist(email);
        if (res && res.status == 200) {
          if (res.recordList) {
            isEmailExist = res.recordList;
            return isEmailExist;
          }
          return false;
        }
        else if (res && res.status == 403) {
          this.toastrService.error(res.message, "Error")
        }
    } catch (e) {
      this.toastrService.error("Invalid Email");
    }
  }

  ngAfterViewInit(): void {

  }
}
