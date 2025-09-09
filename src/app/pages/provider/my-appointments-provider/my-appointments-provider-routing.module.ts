import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAppointmentsProviderPage } from './my-appointments-provider.page';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentsProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentsProviderPageRoutingModule {}
