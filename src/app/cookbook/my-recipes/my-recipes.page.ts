import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
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
  private recipeSub: Subscription;


  constructor(private recipesService: RecipesService, private modalCtrl: ModalController) { 
    console.log('constructor');
    // this.recipes = this.recipesService.recipes;
  }

  ngOnInit(): void {
    this.recipeSub = this.recipesService.recipes.subscribe((recipes: any) => {
      // console.log(quotesData);
     
      this.recipes = recipes;
    })
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
        this.recipesService.addMyRecipe(resultData.data.recipeData.title, resultData.data.recipeData.text).subscribe((res) => {
          // this.quotes = res;
        })
      }
    })
  }

  ionViewWillEnter() {
    this.recipesService.getMyRecipes().subscribe((quotes: any) => {
      // console.log(quotesData);
     
      // this.quotes = quotes;
    })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    if(this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
