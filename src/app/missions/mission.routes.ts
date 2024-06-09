import { Routes } from '@angular/router';

import { MissionsComponent } from './missions.component';
import { MissiondetailComponent } from './missiondetail/missiondetail.component';
import { AddComponent } from './add/add.component';
import { SigninComponent } from './signin/signin.component';


export const routes: Routes = [
    { path: '', component: MissionsComponent },
    { path: 'add', component: AddComponent },
    { path: 'detail/:id', component: MissiondetailComponent },
    { path: 'signin/:id', component: SigninComponent}
    
]