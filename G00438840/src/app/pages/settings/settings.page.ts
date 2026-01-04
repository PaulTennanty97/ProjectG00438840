import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonListHeader, IonLabel, IonList, IonRadioGroup, IonItem, IonRadio } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SettingsService } from 'src/app/services/settingsService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonListHeader, IonLabel, IonList, IonRadioGroup, IonItem, IonRadio]
})
export class SettingsPage implements OnInit {
  selectedUnit: 'metric' | 'us' = 'metric';

  constructor(private settingsService: SettingsService) { }

// this ngOnInit starts the settings page, retrieves the saved unit of measurement preference from ionic storage
  async ngOnInit() {
    const savedUnit :'metric'| 'us'|null = await this.settingsService.getUnitPref();
    if(savedUnit){
      this.selectedUnit = savedUnit;
    }else{
      this.selectedUnit = 'metric'; // the default setting will be metric 
    }
  }
// when the user selects the other radio button when selecting of unit of measurement, the latest preference is updated and saved. 
  async onUnitChange(){
    await this.settingsService.setUnitPref(this.selectedUnit);
    console.log('Unit preference saved:', this.selectedUnit);
  }
}
