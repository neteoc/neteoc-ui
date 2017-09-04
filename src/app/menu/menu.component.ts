import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navbarCollapsed = true;
  user: Observable<firebase.User>;
  title = 'NetEOC';
  userdata: firebase.User;
  userID: string;

  constructor(public afAuth: AngularFireAuth,
              private location: Location) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    
  }


  ngOnInit() {
    
    this.user.subscribe(user =>{
      //If user is annon then rediret to the homepage
      if(!this.afAuth.auth.currentUser){
        this.location.go("/");
      } else {
        //else update the profile like to the current user
          this.userID = user.uid
      }
       

    });
  }
}
