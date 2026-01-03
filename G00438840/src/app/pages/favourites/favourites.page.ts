import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonButton } from '@ionic/angular/standalone';
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

  favRecipes: any[] = [];

  constructor(private favService: FavouritesService) { 
    addIcons({trash, trashOutline}); 
  }

  async ionViewWillEnter() {
    await this.favService.loadFavourites();
    this.favRecipes = this.favService.getFavourites();
  }
  ionViewWillLeave(){
    if (document.activeElement instanceof HTMLElement){
      document.activeElement.blur();
    }
  }

  ngOnInit() {
  }

  async removeItem(recipeId: number, event: Event) {
    event.stopPropagation(); 
    await this.favService.removeFavourite(recipeId);
    this.favRecipes = this.favService.getFavourites();
  }

}