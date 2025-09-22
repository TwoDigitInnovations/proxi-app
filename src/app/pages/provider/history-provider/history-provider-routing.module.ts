import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryProviderPage } from './history-provider.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryProviderPageRoutingModule {}
