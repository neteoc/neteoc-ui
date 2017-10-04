

export class Point {
    lat: number;
    lng: number;
    zoom: number;
  }
  
export class MapMarker extends Point {
  
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