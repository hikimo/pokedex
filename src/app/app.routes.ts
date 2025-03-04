import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'loader',
    loadComponent: () => import('./modules/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
];
