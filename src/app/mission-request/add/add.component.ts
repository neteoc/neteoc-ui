import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';

import { MissionRequest } from '../mission-request';
import { MissionRequestService } from '../mission-request.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  newMissionRequestForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private MissionRequestService: MissionRequestService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialize the form in ngOnInit
    this.newMissionRequestForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  async submit() {
    this.submitted = true;
    const newMissionRequest: MissionRequest = {
      name: this.newMissionRequestForm.value.name,
      description: this.newMissionRequestForm.value.description,
      location: this.newMissionRequestForm.value.location,
      submittedBy: this.authService.uid || 'unknown'
    };
    try {
      const missionRequestId = await this.MissionRequestService.addMissionRequest(newMissionRequest);
      console.log('Added mission request with ID: ', missionRequestId);
      this.router.navigate(['/mission-requests/detail', missionRequestId]); // Navigate using the missionID

    } catch (e) {
      console.error('Error adding mission request: ', e);
      throw new Error("Failed to add mission request");
    }

  }

  cancel(): void {
    this.router.navigate(['/mission-requests']);
  }
}