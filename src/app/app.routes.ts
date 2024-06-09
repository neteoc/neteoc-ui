import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'profile', component: ProfileComponent },
    { path: 'profile/:id', component: ProfileComponent },
  
  {
    path: 'missions',
    canActivate: [authGuard],
    loadChildren: () => import('./missions/mission.routes').then(feature => feature.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
