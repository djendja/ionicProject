import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookbookPage } from './cookbook.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CookbookPage,
    children: [
      {
        path: 'my-recipes',
        loadChildren: () => import('./my-recipes/my-recipes.module').then( m => m.MyRecipesPageModule)
      },
      {
        path: 'recommended-recipes',
        loadChildren: () => import('./recommended-recipes/recommended-recipes.module').then( m => m.RecommendedRecipesPageModule)
      },
      {
        path: '',
        redirectTo: '/cookbook/tabs/recommended-recipes',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/cookbook/tabs/recommended-recipes',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookbookPageRoutingModule {}
