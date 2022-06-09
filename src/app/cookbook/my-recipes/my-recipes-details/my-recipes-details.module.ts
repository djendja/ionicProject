import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecipesDetailsPageRoutingModule } from './my-recipes-details-routing.module';

import { MyRecipesDetailsPage } from './my-recipes-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecipesDetailsPageRoutingModule
  ],
  declarations: [MyRecipesDetailsPage]
})
export class MyRecipesDetailsPageModule {}
