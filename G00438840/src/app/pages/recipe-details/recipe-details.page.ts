import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonLabel, IonItem, IonCard, IonButton, IonIcon, IonThumbnail } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { ActivatedRoute } from '@angular/router';
import { Http } from 'src/app/services/http';
import { FavouritesService } from 'src/app/services/favouritesService';
import { heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { SettingsService } from 'src/app/services/settingsService';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonLabel, IonItem, IonCard, IonButton, IonIcon, IonThumbnail]
})
export class RecipeDetailsPage implements OnInit {

  recipe: any;
  private apiKey = "70759a4f7911402abcc53d3c51d3b759";
  extendedIngredients: any;
  isFavourite: boolean = false;
  currentUnit: 'metric'|'us' ='metric';

  constructor(private route: ActivatedRoute, private mhs: Http, private favService: FavouritesService, private setttingsService: SettingsService) {
    addIcons({ heart, 'heart-outline': heartOutline });
  }
  // this extracts the recipe ID from the data returned from the URL. 
   ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Recipe ID from URL:', id);
    if (id) {
      this.fetchRecipeInfo(id);
    }
    // when a user changes the unit of measurements then the change is applied here. 
    this.setttingsService.unit$.subscribe(unit =>{
      this.currentUnit= unit; 
      console.log('Unit of Measurement updated to:', unit);
    });
  }
  ionViewWillEnter() {
    if (this.recipe) {
      this.isFavourite = this.favService.isFavourite(this.recipe.id);
    }
  }
  // a method which manages the favourite status of the recipe. 
  async toggleFavourite() {
    if (this.isFavourite) {
      await this.favService.removeFavourite(this.recipe.id);
      console.log('Removed from storage!');
    } else {
      await this.favService.addFavourite(this.recipe);
      console.log('Saved to Storage')
    }
    this.isFavourite = !this.isFavourite;
  }
// a method which gathers the full recipe details and instructions from the url
  fetchRecipeInfo(id: string) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}&includeNutrition=false`;

    this.mhs.get(url).subscribe((data: any) => {

      console.log(`Recipe ${data.id} received.`);
      // here only the required data is being collected. 
      this.recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        extendedIngredients: data.extendedIngredients,
        name: data.name, 
          //amount: data.measures?.metric?.amount || data.amount,
         // unit: data.measures?.metric?.unitShort || data.unitShort,
         // measures: ing.measures
        instructions: data.instructions,
        analyzedInstructions: data.analyzedInstructions,
      };
      this.isFavourite = this.favService.isFavourite(this.recipe.id);
    });
  }
// a function which formats the ingredient measurements depending on the user preference. 
  getDisplayAmount(ing: any){
    if(!ing || !ing.measures) {
      return ing?.amount + '' + ing?.unit || ''; 
    }
    const measure = this.currentUnit ==='metric' ? ing.measures.metric : ing.measures.us;
    return `${measure.amount} ${measure.unitShort}`
  }
// When leabving the page, this method clodes an ionic elements so they don't remain active. 
  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
