import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Point, MapMarker} from '../common/MapComponents';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './poiEdit.component.html'
})

export class PoiEditModal {
  @Input() editingPoi: MapMarker;

  constructor(public activeModal: NgbActiveModal) {}
}