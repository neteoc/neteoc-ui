import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  missions: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  constructor(db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    this.missions = db.list('/missions');
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

   login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
