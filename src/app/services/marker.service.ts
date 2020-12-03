import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  jsonAsset: string = 'http://localhost:5000/api/trip/3/coordinate';

  private windowLength = 10;
  private arrayXPosition = 4;
  private arrayYPosition = 3;

  constructor(private http: HttpClient) { }

  makeMarkersFromJson(map: L.map): void {
    this.http.get(this.jsonAsset).subscribe((res: Array<Array<any>>) => {
      for (const c of res) {
        const lat = c['latitude'];
        const lon = c['longitude'];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
  }
}
