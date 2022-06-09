import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recommendedRecipes: Recipe[] = [
    {id: 'q1', title: 'Salata sa skripavcem i pestom', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/10504075/pexels-photo-10504075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {id: 'q2', title: 'Momo Kapor', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg'}
  ];

  myRecipes: Recipe[] = [
    {id: 'q1', title: 'Integralna pasta bolonjeze', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {id: 'q2', title: 'Rolat od tikvica', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
  ]
  
    constructor() {
  
    }
  
    getrecommendedRecipe(id: string) {
      return this.recommendedRecipes.find((r: Recipe) => r.id === id);
    }

     
    getMyRecipe(id: string) {
      return this.myRecipes.find((r: Recipe) => r.id === id);
    }

}
