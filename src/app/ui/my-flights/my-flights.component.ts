import { Observable, Subscription, switchMap } from 'rxjs';
import { FlightsService } from 'src/app/core/flight/flights.service';
import { FlightDTO } from 'src/app/core/flight/interface/flight.interface';
import { FlightComponent } from 'src/app/flight/flight.component';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-flights',
  standalone: true,
  imports: [CommonModule, FlightComponent],
  templateUrl: './my-flights.component.html',
  styleUrls: ['./my-flights.component.scss'],
})
export class MyFlightsComponent implements OnInit, OnDestroy {
  flights!: FlightDTO[];

  private subscription: Subscription = new Subscription();

  constructor(private flightsService: FlightsService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  remove(flight: FlightDTO): void {
    const subscription = this.flightsService
      .deleteMyFlight(flight.id)
      .subscribe(() => this.loadData);
    this.subscription.add(subscription);
  }

  goToDetails(flight: FlightDTO) {
    this.router.navigateByUrl(`flights/${flight.id}`);
  }

  private loadData(): void {
    const subscription = this.flightsService.getBooked().subscribe((res) => {
      this.flights = res;
    });
    this.subscription.add(subscription);
  }
}
