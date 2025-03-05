import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@/app/shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'loader'
  },
  {
    path: 'loader',
    loadComponent: () => import('./modules/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
      },
    ]
  },
  {
    path: 'pokedex/:name',
    loadComponent: () => import('./modules/pokedex-detail/pokedex-detail.page').then((m) => m.PokedexDetailPage)
  }
];
