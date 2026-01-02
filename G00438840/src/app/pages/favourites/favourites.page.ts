import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favourites',
  templateUrl:'./favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent],
})
export class favouritesPage implements OnInit {

  constructor() { }
  ngOnInit() {
  }

}