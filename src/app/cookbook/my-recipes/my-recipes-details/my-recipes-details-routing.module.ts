import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecipesDetailsPage } from './my-recipes-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyRecipesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecipesDetailsPageRoutingModule {}
