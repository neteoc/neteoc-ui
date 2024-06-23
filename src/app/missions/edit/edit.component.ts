import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';



import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location
import { MatButtonModule } from '@angular/material/button';


import { MissionService } from '../mission.service';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  @ViewChild('pickerStart') pickerStart!: MatDatepicker<Date>;
  @ViewChild('pickerEnd') pickerEnd!: MatDatepicker<Date>;

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
      location: ['', Validators.required], // Add location
      startDate: ['', Validators.required], // Add startDate
      endDate: ['', Validators.required], // Add endDate
      signupEnabled: [false] // Add signupEnabled, default to false
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
