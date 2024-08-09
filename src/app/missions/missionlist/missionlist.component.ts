import { Component, Input, OnInit, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { user, User } from '@angular/fire/auth';

import { Mission } from '../mission';

import { MissionService } from '../mission.service';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.scss'
})
export class MissionlistComponent implements OnInit {
  @Input() displayedColumns: string[] = ['detailsLink', 'title', 'action', 'edit'];
  @Input() displayHeaders = true;
  private userservice: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  missions: Observable<Mission[]>;
  userRoles: Record<string, boolean> = {};
  

  constructor(
    private missionService: MissionService,
  ) {
    this.missions = missionService.getMissionList();
    


  }

  ngOnInit(): void { 
    this.authService.user$.subscribe(async (aUser: User | null) => {
      if (aUser) {
        const roles = await this.userservice.getUserRoles(aUser.uid);
        this.userRoles = roles as Record<string, boolean>;
      } else {
        this.userRoles = {};
      }
    });
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

  deleteMission(missionId: string) {
    if(confirm("Are you sure you want to delete this mission?")) {
      this.missionService.deleteMission(missionId).then(() => {
        console.log("Mission deleted successfully");
        // Optionally, refresh the list or navigate away
      }).catch(error => {
        console.error("Error deleting mission: ", error);
      });
    }
  }

  checkRoles(roles: string[]): boolean {
    if (this.userRoles) {
      roles.push('superadmin');
      for (const role of roles) {
        if (this.userRoles[role]) {
          console.log("User has role: " + role);
          return true;
        }
      }
    }
    console.log("User does not have any of the required roles");
    return false;
  }

}
