import { Routes } from '@angular/router';

import { MissionsComponent } from './missions.component';
import { MissiondetailComponent } from './missiondetail/missiondetail.component';


export const routes: Routes = [
    { path: '', component: MissionsComponent },
    { path: ':id', component: MissiondetailComponent },
    
]