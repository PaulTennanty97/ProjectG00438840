import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private UNIT_KEY = 'user_unit_pref'; 
  private unitSubject = new BehaviorSubject <'metric'|'us'>('metric'); 
  unit$ = this.unitSubject.asObservable(); 

  constructor(){
    this.loadSavedUnit();
    //this.getUnitPref();
  }

  private async loadSavedUnit(){
    const {value} = await Preferences.get({key: this.UNIT_KEY});
    const unit = (value as 'metric' |'us') || 'metric';
    console.log('SettingsService has loaded the unit of measurement from storage.')
    this.unitSubject.next(unit);
  }

  async getUnitPref(){
    const {value} = await Preferences.get({key: this.UNIT_KEY});
    return (value as 'metric' |'us') || 'metric';
    //const unit = (value as 'metric' |'us') || 'metric'; 
    //this.unitSubject.next(unit); 
  }
  async setUnitPref(unit: 'metric' | 'us'){
    await Preferences.set({
      key: this.UNIT_KEY,
      value: unit
    });
    console.log('SettingsService has saved the unit of measurement to storage.');
    this.unitSubject.next(unit); 
  }
}
