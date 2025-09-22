import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryProviderPageRoutingModule } from './history-provider-routing.module';

import { HistoryProviderPage } from './history-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryProviderPageRoutingModule
  ],
  declarations: [HistoryProviderPage]
})
export class HistoryProviderPageModule {}
