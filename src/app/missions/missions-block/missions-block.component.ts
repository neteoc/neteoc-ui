import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Mission } from '../shared/mission';
import { MissionService } from '../shared/mission.service'


import { User } from '../../users/shared/user'
import { UserService } from '../../users/shared/user.service';


import { UploadService } from '../shared/upload.service';
import { RolesService } from '../../users/shared/roles.service';
import { Role } from '../../users/shared/role';


@Component({
  selector: 'missions-block',
  templateUrl: './missions-block.component.html',
  styleUrls: ['./missions-block.component.css'],
  providers: [RolesService, UserService]
})
export class MissionsBlockComponent {
  private _user: Observable<firebase.User>
  canCreateMission = false;
  missionList: any;
  hasMissions: boolean = false;

  @Input()
  set user(user: Observable<firebase.User>) {
    this._user = (user);
    this._user.subscribe(
          user =>  this.getMissionRoleStatus(user)
    );
    //console.log(this._user)
  }
  get user(): Observable<firebase.User> { return this._user; }
  

  constructor(private roleSvc: RolesService,
              private userSvc: UserService,
            ) {

    
   }

  getMissionRoleStatus(user){
    if(user){
      this.userSvc.getUserMissions(user.uid).subscribe( missionList => {
        this.missionList = missionList;
        if(typeof missionList[0] === 'undefined' ){
          this.hasMissions = false;
        } else {
          this.hasMissions = true;
        }

      })
      this.roleSvc.getRole("addMission", user.uid).subscribe(
        role => this.displayNewMission(role)
      )
    }
  }

  displayNewMission(role){
    this.canCreateMission = role.$value;
  }

  ngOnInit() {
  }

}
