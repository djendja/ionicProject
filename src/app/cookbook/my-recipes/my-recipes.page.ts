import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { 
    console.log('constructor');
    this.recipes = this.recipesService.myRecipes;
  }

  ngOnInit(): void {
      
  }
}
