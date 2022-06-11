import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe';

interface RecipeData {
  title: string;
  text: string;
  imageUrl: string;
  userId: string;
}
@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private _recipes = new BehaviorSubject<Recipe[]>([]);

  // private recommendedRecipes = new Recipe('q1', 'salata sa skripavcem i pestom', 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min','https://images.pexels.com/photos/10504075/pexels-photo-10504075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','w2')
  recommendedRecipes: Recipe[] = [
    {id: 'q1', title: 'Salata sa skripavcem i pestom', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/10504075/pexels-photo-10504075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', userId: 'xxx'},
    {id: 'q2', title: 'Momo Kapor', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg', userId: 'xyx'}
  ];

  // myRecipes: Recipe[] = [
  //   {id: 'q1', title: 'Integralna pasta bolonjeze', text: 'Salata sa skripavcem i pestom po recepturi Telma restorana. Sadrzi rukolu, sir skripavac, pomorandze, seckane bademe, pesto i pravo je letnje osvezenje. Vreme pripreme: 15min',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
  //   {id: 'q2', title: 'Rolat od tikvica', text: 'Mnogima bi se dopao da se nisi trudio dopasti se',imageUrl: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
  // ]

  
  get recipes() {
    return this._recipes.asObservable();
  }

    constructor(private http: HttpClient, private authService: AuthService) {
  
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
    let newRecipe: Recipe;
    let fetchedUserId: string;

    return this.authService.userId.pipe(take(1), 
    switchMap((userId) => {
      fetchedUserId = userId;
      return this.authService.token;
      }), 
    take(1),
    switchMap((token) => {
      newRecipe = new Recipe(
        null,
        title, 
        text, 
        'slika', 
        fetchedUserId
       );
        return this.http.post<{name: string}>(`https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}`,newRecipe)
  
    }),
    take(1),
    switchMap((resData) => {
      generatedId =resData.name;
      return this._recipes;
     }),
     take(1),
     tap((recipes)=> {
       newRecipe.id = generatedId;
      this._recipes.next(
        recipes.concat(newRecipe)
      )
})
    );

  //  return this.http.post<{name: string}>(`https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,{title, text})
  // .pipe(switchMap((resData) => {
  //   generatedId =resData.name;
  //   return this._recipes;
  //  }), take(1), tap((recipes)=> {
  //        this._recipes.next(
  //          recipes.concat({
  //           id: generatedId,
  //           title,
  //           text,
  //           imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yvoire_cadran_solaire.jpg'
  //          })
  //        )
  //  }))

  }

  getMyRecipes() {
    return this.authService.token.pipe(
      take(1), 
      switchMap((token => {
        return this.http
        .get<{[key: string]: RecipeData}>(`https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}`)
      })),
      map((recipesData) => {
        const recipes: Recipe[] = [];
        for(const key in recipesData) {
          if(recipesData.hasOwnProperty(key)) {
            recipes.push(new Recipe(key, recipesData[key].title, recipesData[key].text, recipesData[key].imageUrl, recipesData[key].userId));
          }
        }
        return recipes; 
      }), tap(recipe => {
        this._recipes.next(recipe);
      })
    )
  }
}
