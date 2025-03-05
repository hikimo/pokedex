import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@/app/shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./modules/favorites/favorites.page').then((m) => m.FavoritesPage)
      },
    ]
  },
  {
    path: 'pokedex/:name',
    loadComponent: () => import('./modules/pokedex-detail/pokedex-detail.page').then((m) => m.PokedexDetailPage)
  },
];
