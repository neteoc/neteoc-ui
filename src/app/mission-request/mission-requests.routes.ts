import { Routes } from '@angular/router';

import { MissionRequestComponent } from './mission-request.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
    { path: '', component: MissionRequestComponent },
    { path: 'add', component: AddComponent },
]