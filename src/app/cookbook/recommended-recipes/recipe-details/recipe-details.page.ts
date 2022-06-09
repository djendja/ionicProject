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
  recipe: Recipe = {id: 'q3', title: 'Horace', text: 'Carpe diem?',imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg'};


  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.recipe = this.recipesService.getrecommendedRecipe(paramMap.get('recipeId'));
    })
  }
}
