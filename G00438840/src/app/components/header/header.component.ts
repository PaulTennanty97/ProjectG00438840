import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, home} from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonButtons],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { // activates the button
    addIcons({ heart, settings, home });
  }
  ngOnInit(): void {
  }
  goToSettings() {
    // alert('Button clicked!'); 
    console.log('Heading to Settings...')
    this.router.navigate(['/settings'])
  }
  goToHome() {
    // alert('Button clicked!'); 
    console.log('Heading to HomePage...')
    this.router.navigate(['/home'])
  }
  goToFav() {
    // alert('Button clicked!'); 
    console.log("Heading to Favourites page")
    this.router.navigate(['/favourites'])
  }
}

//export { IonContent };
