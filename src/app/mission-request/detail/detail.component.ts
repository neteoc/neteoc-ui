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

  constructor(
    private route: ActivatedRoute,
    private missionRequestService: MissionRequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.missionRequestService.getMissionRequestById(id).then((missionRequest) => {
        this.missionRequest = missionRequest;
        console.log('Mission request:', missionRequest);
        this.loaded = true;
      }).catch((error) => {
        console.error('Error fetching mission request:', error);
      });
    }
  }
}