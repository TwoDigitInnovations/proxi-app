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
        path: 'home',
        loadChildren: () => import('../pages/provider/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-appointments',
        loadChildren: () => import('../pages/provider/my-appointments/my-appointments.module').then(m => m.MyAppointmentsPageModule)
      },
      {
        path: 'service',
        loadChildren: () => import('../pages/provider/service/service.module').then(m => m.ServicePageModule)
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
