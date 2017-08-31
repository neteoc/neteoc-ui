import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Mission } from './mission';
import { Roster } from './roster';

@Injectable()
export class MissionService {

  private basePath: string = '/missions';
  missions: FirebaseListObservable<Mission[]> = null; //  list of objects
  roster: FirebaseListObservable<Roster[]> = null; //  list of objects
  mission: FirebaseObjectObservable<Mission> = null; //   single object


  constructor(private db: AngularFireDatabase) {
  }

  getMissionList(query={}): FirebaseListObservable<Mission[]> {
    this.missions = this.db.list(this.basePath, {
      query: query
    });
    return this.missions
  }
  getRosterList(key: string, query={}): FirebaseListObservable<Roster[]> {
    const missionPath =  `${this.basePath}/${key}/roster`;
    this.roster = this.db.list(missionPath, {
      query: query
    });
    return this.roster
  }
  // Return a single observable item
  getMission(key: string): FirebaseObjectObservable<Mission> {
    const missionPath =  `${this.basePath}/${key}`;
    this.mission = this.db.object(missionPath)
    return this.mission
  }

  createMission(mission: Mission): void  {
    this.missions.push(mission)
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateMission(key: string, value: any): void {
    this.missions.update(key, value)
      .catch(error => this.handleError(error))
  }
  // Signup for a mission
  signupMission(key: string, userID: string, userData, missionInfo) {
    const missionPath =  `${this.basePath}/${key}`;
    var dbRef = this.db.database.ref(missionPath)
    var missionRosterRef = dbRef.child('roster')
    //missionRosterRef.child(userID).set(userData)

    console.log(missionInfo);
    var missionDetails = {
      title: missionInfo.title,
      location: missionInfo.location,
      startDate: missionInfo.startDate,
      endDate: missionInfo.endDate
    }

    var updates = {};
    updates['/missions/' + key + '/roster/' + userID] = userData;
    updates['/users/' + userID + '/missions/' + key] = missionDetails;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    this.db.database.ref().update(updates)

    const userPath = `/users/${userID}/missions/data`;
    var userMissionsRef = this.db.database.ref(userPath);
    //userMissionsRef.child(key).set(userData)

  }  
  // unSignup for a mission
  removeMissionSignup(key: string, userID: string){
    const missionPath =  `${this.basePath}/${key}`;
    var dbRef = this.db.database.ref(missionPath)
    var missionRosterRef = dbRef.child('roster')
    //missionRosterRef.child(userID).remove().catch(error => this.handleError(error))

    const userPath = `/users/${userID}/missions`;
    var userMissionsRef = this.db.database.ref(userPath);
    //userMissionsRef.child(key).remove().catch(error => this.handleError(error))

    var updates = {};
    updates['/missions/' + key + '/roster/' + userID] = null;
    updates['/users/' + userID + '/missions/' + key] = null;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    this.db.database.ref().update(updates)

  }
  // find out if a user is already signed up for a mission
  getMissionSignupStatus(missionID: string, userID: string): boolean {
    const missionPath =  `${this.basePath}/${missionID}/roster/${userID}`
    if(this.db.object(missionPath)){
      return true
    } else {
      return false
    }

  }
  // Deletes a single item
  deleteMission(key: string): void {
      this.missions.remove(key)
        .catch(error => this.handleError(error))
  }
  // Deletes the entire list of items
  deleteAll(): void {
      this.missions.remove()
        .catch(error => this.handleError(error))
  }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
  

}
