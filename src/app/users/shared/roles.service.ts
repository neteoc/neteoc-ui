import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Role } from './role';


@Injectable()
export class RolesService {
  private basePath: string = '/roles';
  role: FirebaseObjectObservable<Role> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  // Return a single observable item
  getRole(key: string, userID): FirebaseObjectObservable<Role> {
    const rolePath =  `${this.basePath}/${key}/${userID}`;
    this.role = this.db.object(rolePath)
    return this.role
  }



}
