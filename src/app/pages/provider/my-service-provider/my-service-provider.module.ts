import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyServiceProviderPageRoutingModule } from './my-service-provider-routing.module';

import { MyServiceProviderPage } from './my-service-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyServiceProviderPageRoutingModule
  ],
  declarations: [MyServiceProviderPage]
})
export class MyServiceProviderPageModule {}
