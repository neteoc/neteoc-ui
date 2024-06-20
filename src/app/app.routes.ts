import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./profile/profile.routes').then((feature) => feature.routes),
  },
  {
    path: 'missions',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./missions/mission.routes').then((feature) => feature.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
