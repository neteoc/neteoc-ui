import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: ':id',
    component: ViewComponent,
  },
];
