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
        path: 'my-appointments-details-provider',
        loadChildren: () => import('../pages/provider/my-appointments-details-provider/my-appointments-details-provider.module').then(m => m.MyAppointmentsDetailsProviderPageModule)
      },
      {
        path: 'profile-provider',
        loadChildren: () => import('../pages/provider/profile-provider/profile-provider.module').then(m => m.ProfileProviderPageModule)
      },
      {
        path: 'history-provider',
        loadChildren: () => import('../pages/provider/history-provider/history-provider.module').then(m => m.HistoryProviderPageModule)
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
