import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private UNIT_KEY = 'user_unit_pref'; 

  constructor(){}

  async setUnitPref(unit: 'metric' | 'us'){
    await Preferences.set({
      key: this.UNIT_KEY,
      value: unit
    });
  }
  async getUnitPref(): Promise<'metric' | 'us'>{
    const {value} = await Preferences.get({key: this.UNIT_KEY});
    return (value as 'metric' | 'us') || 'metric'; 
  }
  
}
