
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MissionsListComponent } from './missions/missions-list/missions-list.component';
import { MissionsDetailComponent } from './missions/missions-detail/missions-detail.component';
import { MissionsFormComponent } from './missions/missions-form/missions-form.component';

export const routes = [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'm2',
        component: MissionsListComponent
      },
      {
        path: 'missions/create',
        component: MissionsFormComponent
      },
      {
        path: 'missions',
        component: MissionsListComponent
      },
      { path: 'missions/:id', component: MissionsDetailComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: 'profile/:id', component: ProfileComponent }
      
    ]