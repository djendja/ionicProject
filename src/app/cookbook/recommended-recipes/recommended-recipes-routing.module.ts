import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedRecipesPage } from './recommended-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedRecipesPageRoutingModule {}
