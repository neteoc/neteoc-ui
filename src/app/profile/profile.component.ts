import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { EditComponent } from './edit/edit.component';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DialogModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  providers: [
    UserService,
    AuthService
  ]
})
export class ProfileComponent {
  userID: string | null;
  userdetail: any = {
    photoURL: '',
    displayName: 'Loading...',
    email: ''
  };


  constructor(
    public userservice: UserService,
    private authservice: AuthService,
    public dialog: Dialog,
  ) {
    this.userID = this.authservice.getUserID;
  }

  showProfile() {
    this.userservice.getUser(this.userID ?? "").then((user) => {
      console.log(user);
      this.userdetail = user ? user['pubDetails'] : null;
    });
  }

  ngOnInit() {
    this.showProfile();

  }

  openEditDialog() {
    this.dialog.open(EditComponent, {
      data: {
        missionID: this.userID,
      },
    });
  }
}
