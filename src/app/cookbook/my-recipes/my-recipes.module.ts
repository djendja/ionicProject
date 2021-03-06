import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecipesPageRoutingModule } from './my-recipes-routing.module';

import { MyRecipesPage } from './my-recipes.page';
import { MyRecipesElementComponent } from './my-recipes-element/my-recipes-element.component';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecipesPageRoutingModule
  ],
  declarations: [MyRecipesPage, MyRecipesElementComponent, RecipeModalComponent],
  entryComponents: [RecipeModalComponent]
})
export class MyRecipesPageModule {}
