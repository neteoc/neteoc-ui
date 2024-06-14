import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Auth, authState, User, user } from '@angular/fire/auth';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule, 
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionService } from '../mission.service';
import { Mission } from '../mission';
import { start } from 'repl';


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
  providers: [provideNativeDateAdapter()],
  templateUrl: './add.component.html',
  styleUrl: './add.component.less'
})
export class AddComponent {
  newMissionForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    signupEnabled: [true, Validators.required]
  });
  submitted = false;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  userID: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private missionService: MissionService,
    private router: Router,
  ) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.userID = aUser?.uid;
    })
   }

  get f(): { [p: string]: AbstractControl } | undefined {
    return this.newMissionForm?.controls;
  }

  ngOnInit(): void {

  }

  forgotPassword(): void {

  }

  cancel(): void {
    this.router.navigate(['/missions']);
  }

  async submit(): Promise<void> {
    this.submitted = true;
    const startDateValue = this.newMissionForm.value.startDate;
    const endDateValue = this.newMissionForm.value.endDate;

    // Ensure startDate and endDate are valid dates or default to the current date
    const startDate = startDateValue ? new Date(startDateValue) : new Date();
    const endDate = endDateValue ? new Date(endDateValue) : new Date();

    const newMission: Mission = {
      title: this.newMissionForm.value.name || '',
      description: this.newMissionForm.value.description || '',
      location: this.newMissionForm.value.location || '',
      ownerID: this.userID || '',
      startDate: startDate,
      endDate: endDate,
      admins: [],
      roster: [],
      signupEnabled: this.newMissionForm.value.signupEnabled  || false,
    }
    console.log(newMission);
    try {
      const missionID = await this.missionService.addMission(newMission);
      this.router.navigate(['/missions/detail', missionID]); // Navigate using the missionID
    } catch (error) {
      console.error("Failed to add mission", error);
      // Handle the error (e.g., show an error message)
    };
  }

}
