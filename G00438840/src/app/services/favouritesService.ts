import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favourites: any[] = [];

  constructor(){
    this.loadFavourites();
  }

  async addFavourite(recipe: any){
    const favRecipe = this.favourites.find(fav => fav.id ===recipe.id); 
    if(!favRecipe){
      this.favourites.push(recipe); 
      console.log("Recipe addedd to Favourites", this.favourites); 
      await this.saveToStorage(); 

    }
  }
  getFavourites(){
    return this.favourites; 
  }
  async removeFavourite(recipeID: any){
    this.favourites = this.favourites.filter(fav => fav.id != recipeID);
    await this.saveToStorage(); 
    console.log('Recipe removed'); 
  }
  async loadFavourites() {
    console.log("Loading favourites from storage.")
    const {value} = await Preferences.get({ key: 'my_fav_recipes'}); 
    if (value){
      this.favourites = JSON.parse(value); 
      console.log('Data pulled from storage.', this.favourites);
    }
    else{
      console.log('No favourites found');
    }
  }
  async saveToStorage(){
    console.log('Saving to Ionic Storage');
    await Preferences.set({
      key: 'my_fav_recipes', 
      value: JSON.stringify(this.favourites)
    });
    console.log('Save complete!')
  }
  isFavourite(recipeId: number): boolean {
    return this.favourites.some(fav => fav.id == recipeId);
  }

}
