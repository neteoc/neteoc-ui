import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import * as _ from "lodash";


import { Mission } from '../shared/mission';
import { MissionService } from '../shared/mission.service';

import { Attachment } from '../shared/attachment';
import { UploadService } from '../shared/upload.service';


@Component({
  selector: 'missions-form',
  templateUrl: './missions-form.component.html',
  styleUrls: ['./missions-form.component.css'],
})
export class MissionsFormComponent implements OnInit {
  
  selectedFiles: FileList;
  currentUpload: Attachment;

  public isCollapsed = true;

  mission: Mission = new Mission();
  private sub = {};

  constructor(private missionSvc: MissionService,
              private route: ActivatedRoute,
              private router: Router,
              private upSvc: UploadService,
              public afAuth: AngularFireAuth) { }

  detectFiles(event) {
      console.log(event);
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    console.log(file);
    this.currentUpload = new Attachment(file);
    this.upSvc.pushUpload(this.currentUpload)
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if(params['showForm'] ){
          this.isCollapsed = false
        }
      });
  }

  // hooray! traditional forms in angular 2 are undocumented and nonsensical and likely unsupported!
  getFormIsValid() {
    return document.forms["newMissionForm"].checkValidity();
  }


  createMission() {

    if(this.getFormIsValid()) {
      this.missionSvc.createMission(this.mission)
      this.mission = new Mission();
    }
  }
}
