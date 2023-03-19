import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDTO } from '../core/flight/interface/flight.interface';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  @Input() flight!: FlightDTO;
}
