import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

import { User } from '../shared/user'
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  user: Observable<firebase.User>;
  userdetail: FirebaseObjectObservable<User>;
  private sub: any;
  id: string;
  

  constructor(public afAuth: AngularFireAuth,
              private userSvc: UserService,
              private route: ActivatedRoute) {
    this.user = afAuth.authState;
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
   this.userdetail = this.userSvc.getUser(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}