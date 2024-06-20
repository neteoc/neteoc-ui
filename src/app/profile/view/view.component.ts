import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';  
import { Auth, authState, User, user } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../user.service';



@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [UserService],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  private auth: Auth = inject(Auth);
  // User$: Observable<User[]>;
  private sub: any;
  id: string | undefined;
  userdetail: any = {
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
    
    // const auth = inject(Auth);
    // const itemCollection = collection(this.firestore, 'users');
    // this.User$ = collectionData<User>(itemCollection);
    // this.user = auth.authState;
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
