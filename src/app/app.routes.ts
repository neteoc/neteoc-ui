import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'missions', component: MissionsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: PageNotFoundComponent}
];
