import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Mission } from '../shared/mission';
import { MissionService } from '../shared/mission.service'

import { UploadService } from '../shared/upload.service';
import { RolesService } from '../../users/shared/roles.service';
import { Role } from '../../users/shared/role';

@Component({
  selector: 'missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css'],
  providers: [MissionService, UploadService, RolesService]
})
export class MissionsListComponent implements OnInit {
  addMissionRole: FirebaseObjectObservable<Role>;
  user: Observable<firebase.User>;
  canCreateMission = false;
  public missions: FirebaseListObservable<Mission[]>;

  constructor(private missionSvc: MissionService,
              private roleSvc: RolesService,
              public afAuth: AngularFireAuth) {
                this.user = afAuth.authState;
               }

  ngOnInit() {
    this.missions = this.missionSvc.getMissionList({limitToLast: 5})
    //this.addMissionRole = this.roleSvc.getRole("addMission");
    this.user.subscribe(
          user => this.getMissionRoleStatus(user)
    );

  }

  getMissionRoleStatus(user){
    if(user){
      this.roleSvc.getRole("addMission", user.uid).subscribe(
        role => this.displayNewMission(role)
      )
    }

  }

  displayNewMission(role){
    this.canCreateMission = role.$value;
  }

  deleteMissions() {
    this.missionSvc.deleteAll()
  }
  deleteItem(key) {
    this.missionSvc.deleteMission(key)
  }

}
