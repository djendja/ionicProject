import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Recipe } from './recipe';

interface RecipeData {
  title: string;
  text: string;
}
@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private _recipes = new BehaviorSubject<Recipe[]>([]);

  recommendedRecipes: Recipe[] = [
    {id: 'q1', title: 'Salata sa skripavcem i pestom', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/10504075/pexels-photo-10504075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    {id: 'q2', title: 'Momo Kapor', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg'}
  ];

  // myRecipes: Recipe[] = [
  //   {id: 'q1', title: 'Integralna pasta bolonjeze', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
  //   {id: 'q2', title: 'Rolat od tikvica', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
  // ]

  
  get recipes() {
    return this._recipes.asObservable();
  }

    constructor(private http: HttpClient) {
  
    }
  
    getrecommendedRecipe(id: string) {
      return this.recommendedRecipes.find((r: Recipe) => r.id === id);
    }

     
    getMyRecipe(id: string) {
      // return this._recipes.find((r: Recipe) => r.id === id);
    }

  //   addRecipe(recipe: Recipe): void {
  //     this.myRecipes.push(recipe);
  // }

  addMyRecipe(title: string, text: string) {
    let generatedId;
   return this.http.post<{name: string}>(`https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,{title, text})
  .pipe(switchMap((resData) => {
    generatedId =resData.name;
    return this._recipes;
   }), take(1), tap((recipes)=> {
         this._recipes.next(
           recipes.concat({
            id: generatedId,
            title,
            text,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg'
           })
         )
   }))

  }

  getMyRecipes() {
    return this.http
      .get<{[key: string]: RecipeData}>('https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map((recipesData) => {
        const recipes: Recipe[] = [];
        for(const key in recipesData) {
          if(recipesData.hasOwnProperty(key)) {
            recipes.push({
              id: key,
              title: recipesData[key].title,
              text: recipesData[key].text,
              imageUrl: 'https://www.moroccoworldnews.com/wp-content/uploads/2022/02/20-quotes-to-boost-your-motivation-and-productivity-800x512.png'
            });
          }
        }
        return recipes; 
      }), tap(recipe => {
        this._recipes.next(recipe);
      }))
  }
}
