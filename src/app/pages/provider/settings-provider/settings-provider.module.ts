import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsProviderPageRoutingModule } from './settings-provider-routing.module';

import { SettingsProviderPage } from './settings-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsProviderPageRoutingModule
  ],
  declarations: [SettingsProviderPage]
})
export class SettingsProviderPageModule {}
