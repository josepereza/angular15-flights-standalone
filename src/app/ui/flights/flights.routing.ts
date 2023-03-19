import { Routes } from '@angular/router';

export const FLIGHTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./flights.component').then((c) => c.FlightsComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./flight-details/flight-details.component').then(
        (m) => m.FlightDetailsComponent
      ),
  },
];
