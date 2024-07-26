import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

import { MissionRequest } from '../mission-request';
import { MissionRequestService } from '../mission-request.service';
import { AuthService } from '../../auth.service';
import { state } from '@angular/animations';
import { zip } from 'rxjs';

@Component({
  selector: 'app-request',
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
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  newMissionRequestForm!: FormGroup;
  submitted = false;
  hasUnitNumber = false;
  states = [
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

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
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required], 
    });
  }

  async submit() {
    this.submitted = true;


    const newMissionRequest: MissionRequest = {
      name: this.newMissionRequestForm.value.name,
      description: this.newMissionRequestForm.value.description,
      address: {
        name: this.newMissionRequestForm.value.location,
        address: this.newMissionRequestForm.value.address,
        address2: this.newMissionRequestForm.value.address2,
        city: this.newMissionRequestForm.value.city,
        state: this.newMissionRequestForm.value.state,
        postalCode: this.newMissionRequestForm.value.postalCode
      },
      submittedBy: this.authService.uid || 'unknown',
      submittedDate: new Date().toISOString(),
      startDate: new Date( this.newMissionRequestForm.value.startDate ).toISOString(),
      endDate: new Date( this.newMissionRequestForm.value.endDate ).toISOString(),
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