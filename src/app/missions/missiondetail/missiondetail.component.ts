import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {MatCardModule} from '@angular/material/card';

import { Mission } from '../mission';
import { SigninComponent } from '../signin/signin.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-missiondetail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    MatCardModule
  ],
  templateUrl: './missiondetail.component.html',
  styleUrl: './missiondetail.component.less'
})
export class MissiondetailComponent implements OnInit {
  mission$: Observable<Mission>;
  firestore: Firestore = inject(Firestore);
  private route: ActivatedRoute = inject(ActivatedRoute);
  missionId: string | null = null;
  
  constructor(
    public dialog: Dialog,
    private authService: AuthService,
    private router: Router,
  ) {
    
    // Initialize the mission Observable
    this.mission$ = this.route.paramMap.pipe(
      switchMap(params => {
        // Get the mission ID from the route parameters
        const missionId = params.get('id');
        if (!missionId) {
          throw new Error('Mission ID not found in route parameters.');
        }
        this.missionId = missionId;
        // Use the mission ID to query Firestore
        const missionDocRef = doc(this.firestore, `missions/${missionId}`);
        return docData(missionDocRef, { idField: 'id' }) as Observable<Mission>;
      })
    );
  }

  isOwner(missionOwnerId: string): boolean {
    console.log("Checking if user is the owner of the mission")
    // Assuming you have a way to get the current user's ID, for example, from a UserService

    if (!this.authService.uid) {
      console.log("User not logged in");
      return false;
    } else {
      console.log("User logged in. " + this.authService.uid + " is the current user");
      return missionOwnerId === this.authService.uid;
    }
    
  }

  goBack() {
    // Navigate back to the previous page
    //window.history.back();
    this.router.navigate(['/missions']);
  }

  ngOnInit(): void {
    // ngOnInit remains empty as the logic is handled in the constructor
  }

  openDialog() {
    this.dialog.open(SigninComponent, {
      data: {
        missionID: this.missionId,
      },
    });
  }
  
  }

