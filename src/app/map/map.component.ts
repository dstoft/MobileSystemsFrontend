import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconUrl,
  iconSize: [25/3, 41/3]
});
L.Marker.prototype.options.icon = iconDefault;

const mapDrivingSettings = {
  center: [ 55.422565, 10.3834783 ],
  zoom: 13
};

interface DropDownModel {
  displayName: string;
  id: number;
  listKey: string;
}

interface DropdownModelWithtitle {
  title: string;
  dropDownOptions: DropDownModel[];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;

  selectedTrip: any = null;
  dropDownList: DropdownModelWithtitle = {title: "Wow", dropDownOptions: []};
  tripList: Array<any>

  constructor(private markerService: MarkerService, private http: HttpClient) { }

  ngOnInit() {
    this.initMap();
    this.setTripList()
  }

  private initMap(): void {
    this.map = L.map('map', mapDrivingSettings);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  setSelectedTrip(tripListKey: string) {
    this.selectedTrip = this.tripList[tripListKey]
    
    this.markerService.makeMarkersFromJson(this.map, this.selectedTrip['id']);
  }

  setTripList() {
    this.http.get(BackendService.buildGetTripsUrl()).subscribe((res: Array<Array<any>>) => {
      this.tripList = res;
      this.dropDownList = {title: "Wow", dropDownOptions: []};
      for(var key in res) {
        var item = res[key]
        this.dropDownList.dropDownOptions.push({displayName: item['time'], listKey: key, id: item['id']});
      }
    });
    
  }

}
