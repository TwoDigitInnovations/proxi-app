import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurposeOfVisitPageRoutingModule } from './purpose-of-visit-routing.module';

import { PurposeOfVisitPage } from './purpose-of-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurposeOfVisitPageRoutingModule
  ],
  declarations: [PurposeOfVisitPage]
})
export class PurposeOfVisitPageModule {}
