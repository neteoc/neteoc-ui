import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from './user';

@Injectable()
export class UserService {

  private basePath: string = '/users';
  users: FirebaseListObservable<User[]> = null; //  list of objects
  user: FirebaseObjectObservable<User> = null; //   single object

  constructor(private db: AngularFireDatabase) {}

  // Return a single observable item
  getUser(key: string): FirebaseObjectObservable<User> {
    const userPath =  `${this.basePath}/${key}`;
    this.user = this.db.object(userPath)
    return this.user
  }

  getUserDetails(key: string): FirebaseObjectObservable<User> {
    const userPath =  `${this.basePath}/${key}/pubDetails`;
    this.user = this.db.object(userPath)
    return this.user
  }

  updateUserDetails(key: string, value: any){
    var updates = {};
    updates['/users/' + key + '/pubDetails'] = value;
    this.db.database.ref().update(updates)

  }

  getUserMissions(key: string): FirebaseListObservable<any> {
    const userPath =  `${this.basePath}/${key}/missions`;
    return  this.db.list(userPath)
  }

}
