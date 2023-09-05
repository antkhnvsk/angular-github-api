import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'repos',
    loadComponent: () =>
      import('./repos-page').then((c) => c.ReposPageComponent),
  },
  {
    path: 'commits/:repo',
    loadComponent: () =>
      import('./commits-page').then((c) => c.CommitsPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'repos',
  },
];
