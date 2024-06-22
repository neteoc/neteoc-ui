import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent
  },
  {
    path: 'recruiting',
    canActivate: [authGuard],
    loadChildren: () => import('./recruiting/recruiting.routes').then(feature => feature.routes),
  },
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent
  },
  {
    path: 'profile/:id',
    canActivate: [authGuard],
    component: ProfileComponent
  },
  
  {
    path: 'missions',
    canActivate: [authGuard],
    loadChildren: () => import('./missions/mission.routes').then(feature => feature.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
