import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'flights',
  },
  {
    path: 'flights',
    loadChildren: () =>
      import('./ui/flights/flights.routing').then((m) => m.FLIGHTS_ROUTES),
  },
  {
    path: 'my-flights',
    loadComponent: () =>
      import('./ui/my-flights/my-flights.component').then(
        (m) => m.MyFlightsComponent
      ),
  },
];
