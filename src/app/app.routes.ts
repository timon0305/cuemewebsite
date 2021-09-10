import { Routes, RouterModule } from '@angular/router';
// import { DemoComponent } from './demo/demo.component';
//import { BlogComponent } from './blog/blog.component';

export const rootRouterConfig: Routes = [
  // { 
  //   path: '', 
  //   redirectTo: 'demo', 
  //   pathMatch: 'full' 
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // { 
  //   path: 'demo',
  //   component: DemoComponent
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'privacypolicy/:type',
  //   loadChildren: () => import('./privacypolicy/privacypolicy.module').then(m => m.PrivacyPolicyModule)
  // },
  // {
  //   path: 'termscondition/:type',
  //   loadChildren: () => import('./termscondition/termscondition.module').then(m => m.TermsconditionModule)
  // },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'termscondition',
    loadChildren: () => import('./termscondition/termscondition.module').then(m => m.TermsconditionModule)
  },
  {
    path: 'returnpolicy',
    loadChildren: () => import('./returnpolicy/returnpolicy.module').then(m => m.ReturnpolicyModule)
  },
  {
    path: 'howtoredeem',
    loadChildren: () => import('./howtoredeem/howtoredeem.module').then(m => m.HowToRedeemModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutusModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  { path: 'cardnumber/:token', loadChildren: () => import('./stripe/card-number/card-number.module').then(m => m.CardNumberModule) },
  { path: 'appsubscription/:token', loadChildren: () => import('./stripe/appsubscription/appsubscription.module').then(m => m.AppSubscriptionModule) },
  { path: 'stripecards/:token', loadChildren: () => import('./stripe/stripecards/stripecards.module').then(m => m.StripeCardsModule) },
  { path: 'success', loadChildren: () => import('./stripe/successscreen/successscreen.module').then(m => m.SuccessScreenModule) },
  { path: 'playerdetail/:id', loadChildren: () => import('./playerdetail/playerdetail.module').then(m => m.PlayerdetailModule) },
  { path: 'forgotpassword', loadChildren: () => import('./adminforgotpassword/adminforgotpassword.module').then(m => m.AdminForgotPasswordModule), },

  // { 
  //   path: 'blog',
  //   component: BlogComponent,
  //   loadChildren: () => import('./blog/blog.module').then(m=>m.BlogModule)
  // },
  // { 
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
  // },
  {
    path: '**',
    redirectTo: 'home/one'
  }
];

