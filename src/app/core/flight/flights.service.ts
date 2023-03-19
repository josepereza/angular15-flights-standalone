import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightDTO } from 'src/app/core/flight/interface/flight.interface';
import { environment } from 'src/assets/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  readonly apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FlightDTO[]> {
    return this.http
      .get<FlightDTO[]>(`${this.apiURL}/flights`)
      .pipe(map((res) => res));
  }

  getOne(id: string): Observable<FlightDTO> {
    return this.http
      .get<FlightDTO>(`${this.apiURL}/flights/${id}`)
      .pipe(map((res) => res));
  }

  getBooked(): Observable<FlightDTO[]> {
    return this.http
      .get<FlightDTO[]>(`${this.apiURL}/bookedFlights`)
      .pipe(map((res) => res));
  }

  addToMyFlight(flight: FlightDTO): Observable<FlightDTO> {
    return this.http
      .post<FlightDTO>(`${this.apiURL}/bookedFlights`, { ...flight })
      .pipe(map((res) => res));
  }

  deleteMyFlight(id: number): Observable<{}> {
    return this.http
      .delete<{}>(`${this.apiURL}/bookedFlights/${id}`)
      .pipe(map((res) => res));
  }
}
