import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe: Recipe;


  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.recipesService.getRecommendedRecipe(paramMap.get('recipeId')).subscribe((recipe) => {
        if(recipe != 'obrisan'){
          console.log(recipe);
          this.recipe = recipe;
        }
          
        });
      })
  }
}
