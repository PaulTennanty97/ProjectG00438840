
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', // this is the main page of the project.
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // redirects any empty paths to the home path.
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  /*{
    path: 'recipe-details',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },*/
  {
    path: 'recipe-details/:id', // a route to the page where recipe details are displayed. 
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },
  {
    path: 'settings', // a route to the settings page. 
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'favourites', // a route to the favourites page. 
    loadComponent: () => import('./pages/favourites/favourites.page').then( m => m.favouritesPage)
  },

];
