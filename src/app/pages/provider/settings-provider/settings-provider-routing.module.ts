import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsProviderPage } from './settings-provider.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsProviderPageRoutingModule {}
