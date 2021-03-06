import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecipesPage } from './my-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: MyRecipesPage
  },
  {
    path: ':recipeId',
    loadChildren: () => import('./my-recipes-details/my-recipes-details.module').then( m => m.MyRecipesDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecipesPageRoutingModule {}
