import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-my-recipes-element',
  templateUrl: './my-recipes-element.component.html',
  styleUrls: ['./my-recipes-element.component.scss'],
})
export class MyRecipesElementComponent implements OnInit {

 
  @Input() recipe: Recipe = {id: 'q3', text: 'Danish sweet recipe, lisnato testo, jaja, itd', title: 'Danish sweet', imageUrl: 'https://www.mexicanplease.com/wp-content/uploads/2020/01/grocery-list-37-recipes-notepad.jpg'};

  constructor() { }

  ngOnInit() {}

}
