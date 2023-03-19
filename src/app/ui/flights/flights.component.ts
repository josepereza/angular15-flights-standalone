import { Observable, Subscription } from 'rxjs';
import { FlightDTO } from 'src/app/core/flight/interface/flight.interface';
import { FlightComponent } from 'src/app/flight/flight.component';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlightsService } from '../../core/flight/flights.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FlightComponent],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights!: FlightDTO[];

  private subscription: Subscription = new Subscription();
  constructor(
    private flightsService: FlightsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  track(flight: FlightDTO) {
    const subscription = this.flightsService
      .addToMyFlight(flight)
      .subscribe(() => this.loadData);
    this.subscription.add(subscription);
  }

  goToDetails(flight: FlightDTO) {
    this.router.navigate([flight.id], { relativeTo: this.activatedRoute });
  }

  private loadData(): void {
    const subscription = this.flightsService.getAll().subscribe((res) => {
      this.flights = res;
    });
    this.subscription.add(subscription);
  }
}
