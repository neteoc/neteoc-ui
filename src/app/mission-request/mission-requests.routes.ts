import { Routes } from '@angular/router';

import { MissionRequestComponent } from './mission-request.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    { path: '', component: MissionRequestComponent },
    { path: 'add', component: AddComponent },
    { path: 'new', component: AddComponent },
    { path: 'detail/:id', component: DetailComponent },
]