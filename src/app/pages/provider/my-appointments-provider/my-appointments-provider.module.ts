import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentsProviderPageRoutingModule } from './my-appointments-provider-routing.module';

import { MyAppointmentsProviderPage } from './my-appointments-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentsProviderPageRoutingModule
  ],
  declarations: [MyAppointmentsProviderPage]
})
export class MyAppointmentsProviderPageModule {}
