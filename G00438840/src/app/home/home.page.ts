import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonSearchbar, IonList, IonThumbnail, IonItem, IonLabel, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';
import { Http } from '../services/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonContent, IonSearchbar, IonList, IonThumbnail, IonItem, IonLabel, IonButton, IonCard],
})
export class HomePage {

  recipes: any[] = [];
  private apiKey = "70759a4f7911402abcc53d3c51d3b759";

  constructor(private mhs: Http, private router: Router) { }

  viewDetails(id: number){
    this.router.navigate(['/recipe-details', id]);
  }

  ngOnInit() { // getting the JSON data from the url. 
    this.getRecipes('');
  }

  handleInput(event: any) {
    const query = event?.target.value.toLowerCase();
    if(!query || query.trim() === ''){ // will clear the displayed results when the search bar empties
      this.recipes = []; 
      return;
    }
    if (query && query.trim().length >= 3) { // will not search until at least 3 characters are typed. 
      this.getRecipes(query);
    }
  }
  getRecipes(query: string) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&query=${query}&number=25`;
    this.mhs.get(url).subscribe({
      next: (data: any) => {
        this.recipes = data.results;
        console.log('Data received:', this.recipes);
      },
      error: (e: any) => {
        console.error(e);
      },
      complete: () => { }
    });
  }
}

