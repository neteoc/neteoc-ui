import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MissionsListComponent } from './missions/missions-list/missions-list.component';
import { MissionsDetailComponent } from './missions/missions-detail/missions-detail.component';
import { MissionsFormComponent } from './missions/missions-form/missions-form.component';
import { MissionsBlockComponent } from './missions/missions-block/missions-block.component';
import { MissionsEditComponent } from './missions/missions-edit/missions-edit.component';
import { ProfileEditComponent } from './users/profile-edit/profile-edit.component';
import { GeoComponent } from './geo/geo.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { PoiEditModal } from './modals/poiEdit.component';

RouterModule.forRoot([
  {
    path: '/',
    component: AppComponent
  }
])

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    MissionsListComponent,
    MissionsDetailComponent,
    MissionsFormComponent,
    MissionsBlockComponent,
    MissionsEditComponent,
    ProfileEditComponent,
    GeoComponent,
    LeafletMapComponent,
    PoiEditModal
  ],
  entryComponents: [
    PoiEditModal
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'gsdf'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


