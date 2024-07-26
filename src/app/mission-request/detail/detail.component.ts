import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionRequestService } from '../mission-request.service';
import { MissionRequest } from '../mission-request';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  missionRequest: MissionRequest | null = null;
  loaded = false;
  mapLink = '';

  constructor(
    private route: ActivatedRoute,
    private missionRequestService: MissionRequestService
  ) { }
  
  getMapsLink(MissionRequest: MissionRequest): string {
    const address = MissionRequest.address.address.replaceAll(' ', '+');
      return `https://www.google.com/maps/search/?api=1&query=${address}+${MissionRequest.address.city}+${MissionRequest.address.state}+${MissionRequest.address.postalCode}`;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.missionRequestService.getMissionRequestById(id).then((missionRequest) => {
        this.missionRequest = missionRequest;
        if (this.missionRequest) {
          this.mapLink = this.getMapsLink(this.missionRequest);
        }
        console.log('Maps Link:', this.mapLink);
        console.log('Mission request:', missionRequest);
        this.loaded = true;
      }).catch((error) => {
        console.error('Error fetching mission request:', error);
      });
    }
  }
}