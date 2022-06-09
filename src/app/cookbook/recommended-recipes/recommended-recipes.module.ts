import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedRecipesPageRoutingModule } from './recommended-recipes-routing.module';

import { RecommendedRecipesPage } from './recommended-recipes.page';
import { RecipeElementComponent } from '../recipe-element/recipe-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedRecipesPageRoutingModule
  ],
  declarations: [RecommendedRecipesPage, RecipeElementComponent]
})
export class RecommendedRecipesPageModule {}
