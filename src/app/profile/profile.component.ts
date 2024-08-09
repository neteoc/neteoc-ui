import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Profile } from '../user';
import { User as UserDetail } from '../user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  providers: [UserService],
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private auth: Auth = inject(Auth);
  private sub!: Subscription;
  id: string | undefined;
  userProfile: Profile = {
    photoURL: '',
    displayName: 'Unknown',
    email: '',
  };
  userDetail: UserDetail = {
    $key: '',
    name: '',
    approved: false,
    private: [],
    public: [],
  };

  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  firestore: Firestore = inject(Firestore);
  user: User | null = null;

  constructor(
    public userservice: UserService,
    private route: ActivatedRoute
  ) {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
        this.user = aUser;
        this.id = aUser?.uid;
      }
    );
  }

  showProfile() {
    this.userservice.getUser(this.id ?? '').then((user) => {
      this.userDetail = user
        ? (user as UserDetail)
        : {
          $key: '',
          name: '',
          approved: false,
          private: [],
          public: [],
        };
      });
    
    this.userservice.getProfile(this.id ?? '').then((user) => {
      console.log(user);
      this.userProfile = user
        ? (user as Profile)
        : {
            photoURL: '',
            displayName: 'Unknown',
            email: '',
          };
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
      } else if (this.authService.uid) {
        this.id = this.authService.uid;
        console.log("this.id: ", this.id);
      }
      this.showProfile();
    });
  }
}
