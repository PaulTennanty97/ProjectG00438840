import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  // an array which holds favourite recipes. 
  private favourites: any[] = [];

  constructor(){
    // when the page is loaded, any favoourites will be loaded by loadFavourites method. 
    this.loadFavourites();
  }
// a method to add a recipe as a favourite. 
  async addFavourite(recipe: any){
    const favRecipe = this.favourites.find(fav => fav.id ===recipe.id); 
    if(!favRecipe){
      this.favourites.push(recipe); 
      console.log("Recipe addedd to Favourites", this.favourites); 
      await this.saveToStorage(); // updates the storage so the browser / phone can remember. 

    }
  }
  // this method will return the current list of favourites at the time it is called. 
  getFavourites(){
    return this.favourites; 
  }
  // this method will remove a recipe as a favourite using the recipe ID
  async removeFavourite(recipeID: number){
    this.favourites = this.favourites.filter(fav => fav.id != recipeID);
    await this.saveToStorage(); // the changes are asaved to the storage so the browser / phone can remember. 
    console.log('Recipe removed'); 
  }
  // this method will retrieve the favorites list from Capacitor preferences and convert the JSON into an object /array.
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
// this method will save the favourites list to storage so the browser / phone. 
  async saveToStorage(){
    console.log('Saving to Ionic Storage');
    await Preferences.set({
      key: 'my_fav_recipes', 
      value: JSON.stringify(this.favourites)
    });
    console.log('Save complete!')
  }
// this method performs a boolean check as to whether the recipe is already a favourite recipe or not. 
  isFavourite(recipeId: number): boolean {
    return this.favourites.some(fav => fav.id == recipeId);
  }

}
