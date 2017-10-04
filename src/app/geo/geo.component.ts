import { Component, OnInit, ViewChild } from '@angular/core';  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

import { PoiEditModal } from '../modals/poiEdit.component';

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
  mapMarkers: MapMarker[];
  modalCloseResult: string;

  mapCenter: Point = {    // give mapCenter a value so that setMapCenter has a correct binding
      lat: 32.837,
      lng: -83.632,
      zoom: 10
  };

  editingPoi: MapMarker;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.mapParams =  {zoom: 13, center: [51.505, -0.09]};
    this.tileData = {
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: 'Ma',
    }
    this._leafletMap.initialize(this.mapParams, this.tileData );
  }  

  open() {
    const modalRef = this.modalService.open(PoiEditModal);
    modalRef.componentInstance.name = 'World';
  }
  
  /*
  // https://ng-bootstrap.github.io/#/components/modal/examples
    open(content) {
      console.log(content);
      this.modalService.open(content).result.then((result) => {
        this.modalCloseResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.modalCloseResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    */

  editPoi(pointOfInterest): void {
    
      // TODO: Default values shouldn't be added to map marker list until the user saves the marker?
      if(pointOfInterest == null) {
          this.addMapMarker(this.mapCenter["lat"], this.mapCenter["lng"], 
              "new map marker", "description of point", true);
          pointOfInterest = this.mapMarkers[this.mapMarkers.length - 1];
      }

      this.editingPoi = pointOfInterest;

      /*
      uibModal.open({
          templateUrl: "views/gis/poiEdit.modal.html",
          controller: "poiEditController",
          scope: $scope
      }).result.then(function(result){
          // TODO: if editing a POI and the values are not the defaults, are you sure you want to cancel?
      }, function(err){});
      */
  };

  // TODO: There needs to be an 'add' function to add the object,
  // and the map (leaflet) specific data (like click and drag) should be separate ...
  addMapMarker(lat, lng, name, description, draggable): MapMarker {
    
    var newMapMarker: MapMarker = {
          id: this.generateUUID(),
          lat: lat,
          lng: lng,
          zoom: 10,
          name: name,
          description: description,
          draggable: draggable,
          uploaded: false,
          created: this.getCurrentUnixTime(),
          modified: this.getCurrentUnixTime(),
          fields: { },
          attachments: {}
      };
      this.mapMarkers.push(newMapMarker);

      return newMapMarker;
  };
  
  /**
   * Helper functions
   * TOOD: Move
   */    
  generateUUID(): String {
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }

  militaryDateFormat = function(date) {

      if(!date) return "";

      var newDate = new Date();
      newDate.setTime(date);
      
      return newDate.getDay() + "-"
          + newDate.getMonth() + " "
          + newDate.getHours()
          + newDate.getMinutes();
  }

  getCurrentUnixTime(): number {

      return (new Date()).getTime()/1000|0;
  }
}

class Point {
  lat: number;
  lng: number;
  zoom: number;
}

class MapMarker extends Point {

  id: String;
  name: String;
  description: String;
  draggable: Boolean;
  uploaded: Boolean;
  created: number;
  modified: number;
  fields: Object;
  attachments: Object;
}
