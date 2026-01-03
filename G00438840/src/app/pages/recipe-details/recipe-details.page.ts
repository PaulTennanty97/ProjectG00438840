import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonLabel, IonItem, IonCard, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { ActivatedRoute } from '@angular/router';
import { Http } from 'src/app/services/http';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonLabel, IonItem, IonCard, IonButton, IonIcon]
})
export class RecipeDetailsPage implements OnInit {

  recipe: any;
  private apiKey = "70759a4f7911402abcc53d3c51d3b759";

  constructor(private route: ActivatedRoute, private mhs: Http) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('Recipe ID from URL:', id);
    if (id) {
      this.fetchRecipeInfo(id);
    }
  }
  fetchRecipeInfo(id: string) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`

    this.mhs.get(url).subscribe((data: any) => {
      console.log('Recipe data received:', data);
      this.recipe = data;
    });
  }
}
