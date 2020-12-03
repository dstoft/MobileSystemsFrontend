import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

/*
var greenIcon = L.icon({
  iconUrl: 'assets/GreenMarker.png',

  iconSize:     [2, 2] // size of the icon
  //iconAnchor:   [22, 94] // point of the icon which will correspond to marker's location
});
*/

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  jsonAsset: string = '/assets/Driving.json';

  private windowLength = 10;
  private arrayXPosition = 4;
  private arrayYPosition = 3;

  constructor(private http: HttpClient) { }

  makeMarkersFromJson(map: L.map): void {
    console.log("Before loop!");
    this.http.get(this.jsonAsset).subscribe((res: Array<Array<any>>) => {
      var retArray = this.medianFilter(res);
      //var retArray = this.meanFilter(res);

      for (const c of retArray) {
      //for (const c of res) {
        const lat = c[0];
        const lon = c[1];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
    console.log("After loop!");
  }

  medianFilter(inputArray: Array<Array<any>>): Array<Array<any>> {
    var retArray = [];
    for(var i = 0; i <= inputArray.length; i++) {
      var medianArrayX = [];
      var medianArrayY = [];
      for(var j = -this.windowLength; j <= this.windowLength; j++) {
        if(i + j < 0) {
          medianArrayX.push(inputArray[0][this.arrayXPosition]);
          medianArrayY.push(inputArray[0][this.arrayYPosition]);
        } else if(i + j >= inputArray.length) {
          medianArrayX.push(inputArray[inputArray.length-1][this.arrayXPosition]);
          medianArrayY.push(inputArray[inputArray.length-1][this.arrayYPosition]);
        } else {
          medianArrayX.push(inputArray[i + j][this.arrayXPosition]);
          medianArrayY.push(inputArray[i + j][this.arrayYPosition]);
        }
      }
      medianArrayX.sort();
      medianArrayY.sort();
      var windowMid = Math.floor(medianArrayX.length / 2);
      retArray.push([medianArrayX[windowMid], medianArrayY[windowMid]]);
    }
    return retArray;
  }

  meanFilter(inputArray: Array<Array<any>>): Array<Array<any>> {
    var retArray = [];
    for(var i = 0; i <= inputArray.length; i++) {
      var meanX = 0;
      var meanY = 0;
      var meanLength = 0;
      for(var j = -this.windowLength; j <= 0; j++) {
        if(i + j < 0) {
          continue;
        } else if(i + j >= inputArray.length) {
          continue;
        } else {
          meanX += inputArray[i + j][this.arrayXPosition];
          meanY += inputArray[i + j][this.arrayYPosition];
          meanLength++;
        }
      }
      meanX = meanX / (meanLength);
      meanY = meanY / (meanLength);
      retArray.push([meanX, meanY]);
    }
    return retArray;
  }
}
