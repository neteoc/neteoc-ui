import { Component, inject, Inject, Input } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Auth, authState, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MissionService } from '../mission.service';
import { UserService } from '../../user.service';

export interface DialogData {
  missionID: string;
  userID: string;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.less',
})
export class SigninComponent {
  missionId: string | null = null;
  private auth: Auth = inject(Auth);
  private route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  userId: string | undefined;
  user: User | null = null;
  public Latitude: number | null = null;
  public Longitude: number | null = null;

  constructor(
    private missionService: MissionService,
    public userservice: UserService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
    this.missionId = data.missionID;

    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        this.user = aUser;
        this.userId = aUser?.uid;
      }
    );
    console.log('missionId:', this.missionId);
  }

  public ngOnInit(): void {
    this.getLocation();
  }

  meep(missionId: string, userId: string) {
    console.log('meep');
  }

  cancel() {
    this.dialogRef.close();
  }

  signInToMission(
    missionId: string,
    userId: string,
    Latitude: number,
    Longitude: number
  ) {
    this.missionService
      .signIntoMission(missionId, userId, Latitude, Longitude)
      .then(() => {
        this.dialogRef.close();
      })
      .catch((error) => {
        console.error('Error signing into mission:', error);
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.Latitude = position.coords.latitude;
            this.Longitude = position.coords.longitude;
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
