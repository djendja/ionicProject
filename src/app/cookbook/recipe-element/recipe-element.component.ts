import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-element',
  templateUrl: './recipe-element.component.html',
  styleUrls: ['./recipe-element.component.scss'],
})
export class RecipeElementComponent implements OnInit {

  @Input() recipe: Recipe = {id: 'q3', text: 'Danish sweet recipe, lisnato testo, jaja, itd', title: 'Danish sweet', imageUrl: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/01/cream-cheese-danish-5.jpg'};

  constructor() { }

  ngOnInit() {}

}
