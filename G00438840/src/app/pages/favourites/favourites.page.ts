import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonButton } from '@ionic/angular/standalone';
import { FavouritesService } from 'src/app/services/favouritesService';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {trash, trashOutline} from'ionicons/icons'; 

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonItem, RouterLink, IonThumbnail, IonLabel, IonIcon, IonButton],
})
export class favouritesPage implements OnInit {

  //an empty array that stored the favourite recipes
  favRecipes: any[] = [];

 ngOnInit() {
  }
// includes the favourite service. 
  constructor(private favService: FavouritesService) { 
    // the trashbin icon used in the delete favourite button. 
    addIcons({trash, trashOutline}); 
  }
// checks that the list is up to date every time a user visits the page. 
  async ionViewWillEnter() {
    await this.favService.loadFavourites();
    this.favRecipes = this.favService.getFavourites(); 
  }
  // to remove a favourite recipe
  async removeItem(recipeId: number, event: Event) {
    event.stopPropagation(); // stops the routerlink moving the user. 
    await this.favService.removeFavourite(recipeId);
    // will refresh the favourite list after each deletion of a favourite. 
    this.favRecipes = this.favService.getFavourites();
  }
 // checks that the list is up to date every time a user visits the page.
  ionViewWillLeave(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
  }
}