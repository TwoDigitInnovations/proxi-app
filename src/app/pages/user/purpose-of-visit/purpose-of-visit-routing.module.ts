import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurposeOfVisitPage } from './purpose-of-visit.page';

const routes: Routes = [
  {
    path: '',
    component: PurposeOfVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurposeOfVisitPageRoutingModule {}
