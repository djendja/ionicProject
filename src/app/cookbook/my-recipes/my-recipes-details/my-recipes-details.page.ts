import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-my-recipes-details',
  templateUrl: './my-recipes-details.page.html',
  styleUrls: ['./my-recipes-details.page.scss'],
})
export class MyRecipesDetailsPage implements OnInit {
  @Input() recipe: Recipe = {id: 'q3', title: 'Horace', text: 'Carpe diem?',imageUrl: '', userId: 'qwe'};


  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // this.recipe = this.recipesService.getMyRecipes(paramMap.get('recipeId'));
    })
  }
}
