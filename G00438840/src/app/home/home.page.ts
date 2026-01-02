import { Component } from '@angular/core';
import { Router} from '@angular/router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons'; 
import {heart, settings} from 'ionicons/icons'; 
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [HeaderComponent, IonContent],
})
export class HomePage {
  constructor(){}
}


