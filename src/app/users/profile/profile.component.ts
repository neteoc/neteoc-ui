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
  userdetail: any;
  userEditLink: string;
  private sub: any;
  id: string;
  isSelf: boolean = false;
  

  constructor(public afAuth: AngularFireAuth,
              private userSvc: UserService,
              private route: ActivatedRoute) {
    this.user = afAuth.authState;
    
  }

  showProfile(){
    this.userSvc.getUser(this.id).subscribe( userData => {
        this.userdetail = userData
        this.userEditLink = userData.$key

        this.user.subscribe( user => {

          if(user.uid == this.id){
            this.isSelf = true;
          } else {
            this.isSelf = false;
          }

        })

        
        
    })

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       this.showProfile();
      
       // In a real app: dispatch action to load the details here.
    });

    
   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}