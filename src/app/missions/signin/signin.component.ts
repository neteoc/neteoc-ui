import { Component, inject } from '@angular/core';
import { Auth, authState, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';
import { UserService } from '../../user.service';
import { LocationService } from '../../services/location/location.service';




@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.less'
})
export class SigninComponent {
  private auth: Auth = inject(Auth);
  private route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  missionId: string | null = null;
  userId: string | undefined;
  user: User | null = null;
  public Latitude: number | null = null;
  public Longitude: number | null = null;

  

  constructor(
    private missionService: MissionService,
    public userservice: UserService,
  ) {

    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      this.user = aUser;
      this.userId = aUser?.uid;
      });
    this.route.paramMap.subscribe(params => {
      this.missionId = params.get('id');
      console.log(this.missionId);
      });
    }
    
    public ngOnInit(): void {
      this.getLocation();
    }

  meep(missionId: string, userId: string) {
    console.log('meep');
  }

  signInToMission(missionId: string, userId: string, Latitude: number, Longitude: number) {
    console.log('Signing into mission:', missionId, userId);
    this.missionService.signIntoMission(missionId, userId, Latitude, Longitude).then(() => {
      console.log('Signed into mission successfully');
    }).catch(error => {
      console.error('Error signing into mission:', error);
      console.log('missionId:', missionId)
      console.log('userId:', userId)
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.Latitude = position.coords.latitude;
          this.Longitude = position.coords.longitude;
          console.log(this.Latitude);
          console.log(this.Longitude);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
