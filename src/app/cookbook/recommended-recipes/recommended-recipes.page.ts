import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Recipe } from '../recipe';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recommended-recipes',
  templateUrl: './recommended-recipes.page.html',
  styleUrls: ['./recommended-recipes.page.scss'],
})
export class RecommendedRecipesPage implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService, private modalCtrl: ModalController) { 
    console.log('constructor');
    this.recipes = this.recipesService.recommendedRecipes;
  }

  ngOnInit(): void {
      
  }

  openModal() {
    this.modalCtrl.create({
      component: RecipeModalComponent,
      componentProps: {title: 'Add recipe'}
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData: OverlayEventDetail)=> {
      if(resultData.role === 'confirm') {
        console.log(resultData);
      }
    })
  }
}

