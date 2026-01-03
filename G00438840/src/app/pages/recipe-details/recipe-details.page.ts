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

  constructor(private route: ActivatedRoute, private mhs: Http, private favService: FavouritesService) {
    addIcons({ heart, 'heart-outline': heartOutline });
  }
  ionViewWillEnter() {
    if (this.recipe) {
      this.isFavourite = this.favService.isFavourite(this.recipe.id);
    }
  }
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Recipe ID from URL:', id);
    if (id) {
      this.fetchRecipeInfo(id);
    }
  }
  fetchRecipeInfo(id: string) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}&includeNutrition=false`;

    this.mhs.get(url).subscribe((data: any) => {

      console.log(`Recipe ${data.id} received.`);
      this.recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        extendedIngredients: data.extendedIngredients.map((data: any) => ({
          image: data.image,
          name: data.name, 
          amount: data.measures?.metric?.amount || data.amount,
          unit: data.measures?.metric?.unitShort || data.unitShort
        })),
        instructions: data.instructions,
        analyzedInstructions: data.analyzedInstructions,
      };
      this.isFavourite = this.favService.isFavourite(this.recipe.id);
    });
  }
  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
  /* addToFavourites(){
     this.favService.addFavourite(this.recipe); 
   }
   */
}
