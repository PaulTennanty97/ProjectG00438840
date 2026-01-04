import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, IonBackButton} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, home, chevronBackOutline} from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonButtons, IonBackButton],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { // activates the links for the buttons. 
    addIcons({ heart, settings, home, chevronBackOutline }); // the header icons. 
  }
  ngOnInit(): void {
  }

  goToSettings() { // the logic for the Settings button. 
    // alert('Button clicked!'); 
    console.log('Heading to Settings...')
    this.router.navigate(['/settings'])
  }
  goToHome() { // the logic for the home button. 
    // alert('Button clicked!'); 
    console.log('Heading to HomePage...')
    this.router.navigate(['/home'])
  }
  goToFav() { // the logic for the Favourites button. 
    // alert('Button clicked!'); 
    console.log("Heading to Favourites page")
    this.router.navigate(['/favourites'])
  }
}

//export { IonContent };
