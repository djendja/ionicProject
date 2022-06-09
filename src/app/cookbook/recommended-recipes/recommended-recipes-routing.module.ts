import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeElementComponent } from '../recipe-element/recipe-element.component';

import { RecommendedRecipesPage } from './recommended-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedRecipesPage
  },
  {
    path: ':recipeId',
    loadChildren: () => import('./recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedRecipesPageRoutingModule {}
