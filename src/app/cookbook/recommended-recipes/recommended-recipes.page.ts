import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recommended-recipes',
  templateUrl: './recommended-recipes.page.html',
  styleUrls: ['./recommended-recipes.page.scss'],
})
export class RecommendedRecipesPage implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { 
    console.log('constructor');
    this.recipes = this.recipesService.recommendedRecipes;
  }

  ngOnInit(): void {
      
  }
}

