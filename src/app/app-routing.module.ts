import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const token = localStorage.getItem('token')
const userDetail = localStorage.getItem('userDetail')
let user: any = {}
if (userDetail) {
  user = JSON.parse(userDetail)
}

const routes: Routes = [
  {
    path: '',
    redirectTo: token ? user.role === 'provider' ? '/tabs/home-provider' : '/tabs/home' : '/sign-in',
    // redirectTo: '/tabs/home',
    // redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/user/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'my-appointments',
    loadChildren: () => import('./pages/user/my-appointments/my-appointments.module').then(m => m.MyAppointmentsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/user/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/user/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/user/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'my-appointments-details',
    loadChildren: () => import('./pages/user/my-appointments-details/my-appointments-details.module').then(m => m.MyAppointmentsDetailsPageModule)
  },
  {
    path: 'purpose-of-visit',
    loadChildren: () => import('./pages/user/purpose-of-visit/purpose-of-visit.module').then(m => m.PurposeOfVisitPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/user/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./pages/user/payment-success/payment-success.module').then(m => m.PaymentSuccessPageModule)
  },
  {
    path: 'settings-provider',
    loadChildren: () => import('./pages/provider/settings-provider/settings-provider.module').then(m => m.SettingsProviderPageModule)
  },
  {
    path: 'home-provider',
    loadChildren: () => import('./pages/provider/home-provider/home-provider.module').then(m => m.HomeProviderPageModule)
  },
  {
    path: 'my-appointments-provider',
    loadChildren: () => import('./pages/provider/my-appointments-provider/my-appointments-provider.module').then(m => m.MyAppointmentsProviderPageModule)
  },
  {
    path: 'service-provider',
    loadChildren: () => import('./pages/provider/service-provider/service-provider.module').then(m => m.ServiceProviderPageModule)
  },
  {
    path: 'my-appointments-details-provider',
    loadChildren: () => import('./pages/provider/my-appointments-details-provider/my-appointments-details-provider.module').then(m => m.MyAppointmentsDetailsProviderPageModule)
  },
  {
    path: 'profile-provider',
    loadChildren: () => import('./pages/provider/profile-provider/profile-provider.module').then(m => m.ProfileProviderPageModule)
  },
  {
    path: 'history-provider',
    loadChildren: () => import('./pages/provider/history-provider/history-provider.module').then( m => m.HistoryProviderPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
