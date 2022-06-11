import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-my-recipes-details',
  templateUrl: './my-recipes-details.page.html',
  styleUrls: ['./my-recipes-details.page.scss'],
})
export class MyRecipesDetailsPage implements OnInit {
  recipe: Recipe = {id: 'q3', title: 'Horace', text: 'Carpe diem?',imageUrl: ''};


  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // this.recipe = this.recipesService.getMyRecipe(paramMap.get('recipeId'));
    })
  }
}
