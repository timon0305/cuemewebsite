import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';

import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { FeatureComponent } from './feature/feature.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { DownloadComponent } from './download/download.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    HomeComponent,
    IntroComponent,
    AboutComponent,
    FeatureComponent,
    ScreenshotComponent,
    HowItWorkComponent,
    ContactUsComponent,
    FaqComponent,
    DownloadComponent
  ]
})
export class HomeModule { }
