import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurposeOfVisitPageRoutingModule } from './purpose-of-visit-routing.module';

import { PurposeOfVisitPage } from './purpose-of-visit.page';

import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurposeOfVisitPageRoutingModule,
    TranslateDirective,
    TranslatePipe,
  ],
  declarations: [PurposeOfVisitPage]
})
export class PurposeOfVisitPageModule { }
