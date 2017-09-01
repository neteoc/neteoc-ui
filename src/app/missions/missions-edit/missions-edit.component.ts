import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';

import { Mission } from '../shared/mission';
import { MissionService } from '../shared/mission.service';

@Component({
  selector: 'app-missions-edit',
  templateUrl: './missions-edit.component.html',
  styleUrls: ['./missions-edit.component.css'],
  providers: [MissionService]
})
export class MissionsEditComponent implements OnInit {

  mission: Mission = new Mission();
  missionData: FirebaseObjectObservable<Mission>;
  private sub = {};
  id: string;
  user: Observable<firebase.User>;

  constructor(private missionSvc: MissionService,
              private route: ActivatedRoute,
              private router: Router,
              public afAuth: AngularFireAuth,
              private location: Location) {  this.user = afAuth.authState; }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       
    });
    this.missionSvc.getMission(this.id).subscribe( mission => this.setData(mission) )



      //this.mission.subscribe( info => console.log(info))
  }

  setData(mission){

    this.mission = mission

  }


  updateMission(){
    this.missionSvc.updateMission(this.mission.$key, this.mission)
    this.location.go("/misions/" +  this.id);
  }

}
