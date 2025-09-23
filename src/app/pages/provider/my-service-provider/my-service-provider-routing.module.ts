import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyServiceProviderPage } from './my-service-provider.page';

const routes: Routes = [
  {
    path: '',
    component: MyServiceProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServiceProviderPageRoutingModule {}
