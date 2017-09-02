import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;

  constructor(private missionSvc: MissionService,
              private route: ActivatedRoute,
              private router: Router,
              public afAuth: AngularFireAuth,
              private modalService: NgbModal,
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

  deleteMission(){
      this.missionSvc.deleteMission(this.mission.$key)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  updateMission(){
    this.missionSvc.updateMission(this.mission.$key, this.mission)
    this.location.go("/misions/" +  this.id);
  }

}
