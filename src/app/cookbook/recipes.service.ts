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
  private _recommendedRecipes = new BehaviorSubject<Recipe[]>([]);

  private image = 'https://images.pexels.com/photos/6287225/pexels-photo-6287225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
    get recipes() {
      return this._recipes.asObservable();
    }

    get recommendedRecipes() {
      return this._recommendedRecipes.asObservable();
    }


    constructor(private http: HttpClient, private authService: AuthService) {
  
    }
  

    getMyRecipe(id: string) {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.get<RecipeData>(
            `https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
          );
        }),
        map((resData: RecipeData) => {
          if(resData !=null){
            return new Recipe(
              id,
              resData.title,
              resData.text,
              this.image,
              resData.userId
            );
          }else{
            return 'obrisan';
          }
          
        })
      );
    }

    getRecommendedRecipe(id: string) {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.get<RecipeData>(
            `https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recommendedRecipes/${id}.json?auth=${token}`
          );
        }),
        map((resData: RecipeData) => {
          if(resData !=null){
            return new Recipe(
              id,
              resData.title,
              resData.text,
              resData.imageUrl,
              resData.userId
            );
          }else{
            return 'obrisan';
          }
          
        })
      );
    }

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
        this.image, 
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
          recipesData[key].imageUrl = this.image;
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

  getRecommendedRecipes() {
    return this.authService.token.pipe(
      take(1), 
      switchMap((token => {
        return this.http
        .get<{[key: string]: RecipeData}>(`https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recommendedRecipes.json?auth=${token}`)
      })),
      map((recipesData) => {
        console.log(recipesData);
        const recipes: Recipe[] = [];
        for(const key in recipesData) {
          if(recipesData.hasOwnProperty(key)) {
            recipes.push(new Recipe(key, recipesData[key].title, recipesData[key].text, recipesData[key].imageUrl, recipesData[key].userId));
          }
        }
        return recipes; 
      }), tap(recipe => {
        this._recommendedRecipes.next(recipe);
      })
    )
  }

  deleteRecipe(id: string) {
  return this.authService.token.pipe(
    take(1),
    switchMap((token) => {
      return this.http.delete(
        `https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`
      );
    }),
    switchMap(() => {
      return this.recipes; 
    }),
    take(1),
    tap((recipes) => {
      this._recipes.next(recipes.filter((r) => r.id !== id));
    })
  );
  }

  editRecipe(
    id: string, title: string, text: string) {
    let idUser;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId)=>{
        idUser = userId;
        return this.authService.token
      }),
      take(1),
      switchMap((token) => {
          return this.http.put(
            `https://ionicproject-projekat-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json?auth=${token}`,
            {
              title,
              text,
              idUser
            }
          );
        }),
        switchMap(() => {
          return this.recipes;
        }),
        take(1),
        tap((recipes) => {
          const updatedRecipeIndex = recipes.findIndex((r) => r.id === id);
          const updatedRecipes = [...recipes];
          updatedRecipes[updatedRecipeIndex] = new Recipe(
            id,
           title,
           text,
           this.image,
           idUser
          );
          this._recipes.next(updatedRecipes)
        })
      
    );
    
  }
}
