import { Component
  , OnInit
  , ViewChild } from '@angular/core';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
  @ViewChild(LeafletMapComponent) _leafletMap: LeafletMapComponent;
  pin = {};
  mapParams = {};
  tileData = {};
  constructor() { }

  ngOnInit() {
    this.mapParams =  {zoom: 13, center: [51.505, -0.09]};
    this.tileData = {
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: 'Ma',
    }
    this._leafletMap.initialize(this.mapParams, this.tileData );
  }

}
