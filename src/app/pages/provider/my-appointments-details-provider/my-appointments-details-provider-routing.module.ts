import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAppointmentsDetailsProviderPage } from './my-appointments-details-provider.page';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentsDetailsProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentsDetailsProviderPageRoutingModule {}
