import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Recipe } from '../recipe';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService, private modalCtrl: ModalController) { 
    console.log('constructor');
    this.recipes = this.recipesService.myRecipes;
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
