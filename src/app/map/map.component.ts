import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconUrl,
  iconSize: [25/3, 41/3]
});
L.Marker.prototype.options.icon = iconDefault;

const mapDrivingSettings = {
  center: [ 56.214036333333326, 10.142817 ],
  zoom: 13
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;

  constructor(private markerService: MarkerService) { }

  ngOnInit() {
    this.initMap();
    this.markerService.makeMarkersFromJson(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', mapDrivingSettings);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
