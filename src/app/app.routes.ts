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
    ]
  },
  {
    path: 'pokedex/:name',
    loadComponent: () => import('./modules/pokedex-detail/pokedex-detail.page').then((m) => m.PokedexDetailPage)
  }
];
