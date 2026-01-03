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

  async ngOnInit() {
    const savedUnit = await this.settingsService.getUnitPref();
    this.selectedUnit = savedUnit || 'metric'; 
  }
  async onUnitChange(){
    await this.settingsService.setUnitPref(this.selectedUnit);
    console.log('Unit preference saved:', this.selectedUnit);
  }
}
