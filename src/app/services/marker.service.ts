import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private windowLength = 10;
  private arrayXPosition = 4;
  private arrayYPosition = 3;

  private layerGroup: L.layerGroup = null;

  constructor(private http: HttpClient) { }

  makeMarkersFromJson(map: L.map, tripId: number): void {
    if(this.layerGroup != null) {
      this.layerGroup.clearLayers();
    }

    this.layerGroup = L.layerGroup().addTo(map);

    this.http.get(BackendService.buildGetCoordinatesUrl(tripId)).subscribe((res: Array<Array<any>>) => {
      for (const c of res) {
        const lat = c['latitude'];
        const lon = c['longitude'];
        const marker = L.marker([lat, lon]).addTo(this.layerGroup);
      }
    });
  }
}
