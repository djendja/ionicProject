import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
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
  private recipeSub: Subscription

  constructor(private recipesService: RecipesService, private modalCtrl: ModalController) { 
  }

  ngOnInit(): void {
    this.recipeSub = this.recipesService.recommendedRecipes.subscribe((recipes: any) => {     
      this.recipes = recipes;
    })
  }

  
  ionViewWillEnter() {
    this.recipesService.getRecommendedRecipes().subscribe((recipes: any) => {
    })
  }

  openModal() {
    this.modalCtrl.create({
      component: RecipeModalComponent,
      componentProps: {modalTitle: 'Add recipe'}
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData: OverlayEventDetail)=> {
      if(resultData.role === 'confirm') {
      }
    })
  }

  ngOnDestroy() {
    if(this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }

}

