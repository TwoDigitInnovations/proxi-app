import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/user/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-appointments',
        loadChildren: () => import('../pages/user/my-appointments/my-appointments.module').then(m => m.MyAppointmentsPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../pages/user/history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/user/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/provider/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'terms-and-conditions',
        loadChildren: () => import('../pages/user/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('../pages/user/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
      },
      {
        path: 'my-appointments-details',
        loadChildren: () => import('../pages/user/my-appointments-details/my-appointments-details.module').then(m => m.MyAppointmentsDetailsPageModule)
      },
      {
        path: 'purpose-of-visit',
        loadChildren: () => import('../pages/user/purpose-of-visit/purpose-of-visit.module').then(m => m.PurposeOfVisitPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/user/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'settings-provider',
        loadChildren: () => import('../pages/provider/settings-provider/settings-provider.module').then(m => m.SettingsProviderPageModule)
      },
      {
        path: 'home-provider',
        loadChildren: () => import('../pages/provider/home-provider/home-provider.module').then(m => m.HomeProviderPageModule)
      },
      {
        path: 'my-appointments-provider',
        loadChildren: () => import('../pages/provider/my-appointments-provider/my-appointments-provider.module').then(m => m.MyAppointmentsProviderPageModule)
      },
      {
        path: 'service-provider',
        loadChildren: () => import('../pages/provider/service-provider/service-provider.module').then(m => m.ServiceProviderPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
