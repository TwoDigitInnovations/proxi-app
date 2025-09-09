import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAppointmentsDetailsPage } from './my-appointments-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentsDetailsPageRoutingModule {}
