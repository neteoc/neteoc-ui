import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';  
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';


import { UserService } from '../user.service';

interface UserDetails {
  photoURL: string;
  displayName: string;
  email: string;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private sub!: Subscription;
  id: string | undefined;
  userdetail: UserDetails = {
    photoURL: '',
    displayName: 'Loading...',
    email: ''
  };
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  firestore: Firestore = inject(Firestore);
  user: User | null = null;

  constructor(
    public userservice: UserService,
    private route: ActivatedRoute
  ) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.user = aUser;
      this.id = aUser?.uid;
      
    })
  }

  showProfile() {
    this.userservice.getUser(this.id ?? "").then((user) => {
      console.log(user);
      this.userdetail = user ? user['pubDetails'] : null;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.showProfile();
      
      // In a real app: dispatch action to load the details here.
    });


  }
}
