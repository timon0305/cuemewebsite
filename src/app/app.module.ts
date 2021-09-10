import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
//import { DemoComponent } from './demo/demo.component';
//import { BlogComponent } from './blog/blog.component';
import * as $ from 'jquery';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LightboxModule } from 'ngx-lightbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
   
    //DemoComponent,
    //BlogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
    ToastrModule.forRoot(),
    LightboxModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
