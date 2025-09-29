import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentsDetailsPageRoutingModule } from './my-appointments-details-routing.module';

import { MyAppointmentsDetailsPage } from './my-appointments-details.page';

import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentsDetailsPageRoutingModule,
    TranslateDirective,
    TranslatePipe,
  ],
  declarations: [MyAppointmentsDetailsPage]
})
export class MyAppointmentsDetailsPageModule { }
