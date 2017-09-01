import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';


import { Attachment } from './attachment';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }


  private basePath:string = '/missionattachments';
  uploads: FirebaseListObservable<Attachment[]>;
  pushUpload(attachment: Attachment) {
    console.log("PushUpload");
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${attachment.file.name}`).put(attachment.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        attachment.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        attachment.url = uploadTask.snapshot.downloadURL
        attachment.name = attachment.file.name
        this.saveFileData(attachment)
      }
    );
  }
  // Writes the file details to the realtime db
  private saveFileData(attachment: Attachment) {
    this.db.list(`${this.basePath}/`).push(attachment);
  }
}