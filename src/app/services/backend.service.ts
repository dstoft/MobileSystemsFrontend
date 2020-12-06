import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  static backendUrlPrefix: string = 'http://188.166.127.102:8080/api/trip';
  static backendCoordinateUrlSuffix: string = '/coordinate';

  constructor() { }

  static buildGetTripsUrl(): string {
    return this.backendUrlPrefix;
  }

  static buildGetTripStatsUrl(tripId: number): string {
    return this.backendUrlPrefix + '/' + tripId + '/stats';
  }

  static buildGetCoordinatesUrl(tripId: number): string {
    return this.backendUrlPrefix + "/" + tripId + this.backendCoordinateUrlSuffix;
  }

}
