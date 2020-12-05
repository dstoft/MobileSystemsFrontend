import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { TripStatsComponent } from './trip-stats/trip-stats.component';
import { BackendService } from './services/backend.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TripStatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MarkerService,
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
