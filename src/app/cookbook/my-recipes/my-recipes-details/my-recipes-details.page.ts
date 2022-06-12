import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Recipe } from '../../recipe';
import { RecipeModalComponent } from '../../recipe-modal/recipe-modal.component';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-my-recipes-details',
  templateUrl: './my-recipes-details.page.html',
  styleUrls: ['./my-recipes-details.page.scss'],
})
export class MyRecipesDetailsPage implements OnInit {
  @Input() recipe: Recipe = {id: 'q3', title: 'Horace', text: 'Carpe diem?',imageUrl: '', userId: 'qwe'};


  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {


    this.route.paramMap.subscribe((paramMap) => {
        this.recipesService.getMyRecipe(paramMap.get('recipeId')).subscribe((recipe) => {
          if(recipe != 'obrisan'){
            this.recipe = recipe;
          }
          });
        })
  }


  openModal() {
    this.modalCtrl.create({
      component: RecipeModalComponent,
      componentProps: {modalTitle: 'Edit recipe',  title: this.recipe.title, text:  this.recipe.text, buttonText: 'EDIT IT'}
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData: OverlayEventDetail)=> {
      if(resultData.role === 'confirm') {
        this.recipesService.editRecipe(this.recipe.id , resultData.data.recipeData.title, resultData.data.recipeData.text).subscribe((res) => {
          console.log('recept je izmenjen');          
        })
      }
    })
  }


  onEditRecipeClick() {
    this.openModal();
    this.router.navigateByUrl('/cookbook/tabs/my-recipes');
  }

  onDeleteRecipeClick() {
    this.recipesService.deleteRecipe(this.recipe.id).subscribe((recipes)=>{
      console.log('Recept je obrisan...');
      this.router.navigateByUrl('/cookbook/tabs/my-recipes');
    });
  }
}
