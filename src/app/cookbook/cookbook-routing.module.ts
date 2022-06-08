import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookbookPage } from './cookbook.page';

const routes: Routes = [
  {
    path: '',
    component: CookbookPage
  },
  {
    path: 'my-recipes',
    loadChildren: () => import('./my-recipes/my-recipes.module').then( m => m.MyRecipesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookbookPageRoutingModule {}
