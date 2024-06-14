import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location
import { MatButtonModule } from '@angular/material/button';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  missionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private missionService: MissionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location // Inject Location service
  ) {
    this.missionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // Add other fields as necessary
    });
  
    const missionId = this.route.snapshot.paramMap.get('id');
    if (missionId) {
      this.missionService.getMission(missionId).subscribe((mission) => {
        this.missionForm.patchValue(mission);
      });
    }
  }

  
  
  updateMission() {
    const missionId = this.route.snapshot.paramMap.get('id');
    if (missionId) {
      this.missionService.updateMission(missionId, this.missionForm.value).then(() => {
        console.log('Mission updated');
        // Handle navigation or success feedback
        this.location.back();
      }).catch(error => {
        console.error('Error updating mission:', error);
        // Handle error feedback
      });
    }
  }

}
