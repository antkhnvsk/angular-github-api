import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'repos',
    loadComponent: () =>
      import('./repos-page').then((c) => c.ReposPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'repos',
  },
];
