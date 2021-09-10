import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  //public captcha: any;

  constructor(private fb: FormBuilder,
    private homeService: HomeService,
    private toastrService: ToastrService
  ) { }

  // Form Validator
  ngOnInit() {
    //this.captcha = '';
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.required],
      captcha: ['', Validators.required]
    })
  }

  public async sendMail() {
    try {
       let res = await this.homeService.sendGetInTouchEmail(this.contactForm.value.name, this.contactForm.value.message, this.contactForm.value.email);
       if (res && res.status == 200) {
         this.toastrService.success("Mail send successfully");
         this.contactForm.reset();
       }
    }
    catch (error) {
      this.toastrService.error("Mail sending failed");
    }
  }

}
