import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentsDetailsProviderPageRoutingModule } from './my-appointments-details-provider-routing.module';

import { MyAppointmentsDetailsProviderPage } from './my-appointments-details-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentsDetailsProviderPageRoutingModule
  ],
  declarations: [MyAppointmentsDetailsProviderPage]
})
export class MyAppointmentsDetailsProviderPageModule {}
