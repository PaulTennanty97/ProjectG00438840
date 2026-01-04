import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

/* In this class, I rely on the use of BehaviourSubject to store and 
communicate the unit of measurement preference.
  https://eliteionic.com/tutorials/using-behaviorsubject-to-handle-asynchronous-loading-in-ionic/
*/
  private UNIT_KEY = 'user_unit_pref'; 
  private unitSubject = new BehaviorSubject <'metric'|'us'>('metric'); 
  unit$ = this.unitSubject.asObservable(); 

  constructor(){
    this.loadSavedUnit(); // pulls the most recent unit of measurement preference from the local storage. 
  }
// this method loads the user preference when the app starts up.
  private async loadSavedUnit(){
    const {value} = await Preferences.get({key: this.UNIT_KEY});
    const unit = (value as 'metric' |'us') || 'metric';
    console.log('SettingsService has loaded the unit of measurement from storage.')
    this.unitSubject.next(unit);
  }
// this method retrieves the saved unit of measurement preference from local storage.
  async getUnitPref(){
    const {value} = await Preferences.get({key: this.UNIT_KEY});
    return (value as 'metric' |'us') || 'metric';
  }
  // this method updated the unit of measurement preference in the local storage. 
  async setUnitPref(unit: 'metric' | 'us'){
    await Preferences.set({
      key: this.UNIT_KEY,
      value: unit
    });
    console.log('SettingsService has saved the unit of measurement to storage.');
    this.unitSubject.next(unit); 
  }
}
