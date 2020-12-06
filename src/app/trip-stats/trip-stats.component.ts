import { Component, OnInit } from '@angular/core';

interface TripStats {
  tripId: number;
  totalSeconds: number;
  coordinateCount: number;
  totalMeters: number;
  avgSpeed: number;
  avgSecondsPerCoordinate: number;
}

@Component({
  selector: 'app-trip-stats',
  templateUrl: './trip-stats.component.html',
  styleUrls: ['./trip-stats.component.scss']
})
export class TripStatsComponent implements OnInit {

  public currentTripStats: TripStats = null;

  constructor() { }

  ngOnInit() {
  }

  setCurrentTrip(newTripStats: any) {
    console.log(newTripStats);
    this.currentTripStats = {
      tripId: newTripStats['tripId'],
      totalSeconds: newTripStats['totalSeconds'],
      coordinateCount: newTripStats['coordinateCount'],
      totalMeters: newTripStats['totalMeters'],
      avgSpeed: newTripStats['avgSpeed'],
      avgSecondsPerCoordinate: newTripStats['avgSecondsPerCoordinate']
    };
    console.log(this.currentTripStats);
  }

}
