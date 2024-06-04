import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'missions', component: MissionsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: PageNotFoundComponent}
];
