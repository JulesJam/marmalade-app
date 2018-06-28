import { BrowserModule } from '@angular/platform-browser';
import {
  LocationStrategy,
  HashLocationStrategy
  } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {
  RouterModule,
  Routes,
  ActivatedRoute
} from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationRowComponent } from './location-row/location-row.component';
import { LocationImageComponent } from './location-image/location-image.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { ApiService } from './services/api.service';
import { LocationDataService } from './location-data.service';
import { InvitationDataService } from './invitation-data.service'
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LocationsComponent } from './locations/locations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApinewService } from './apinew.service';
import { FindLocalLocationComponent } from './findLocalLocation/findLocalLocation.component';
import { UserLocationService } from './userlocation.service';
import { FindLocationAnywhereComponent } from './find-location-anywhere/find-location-anywhere.component';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { PendingInviteReminderComponent } from './pending-invite-reminder/pending-invite-reminder.component';
import { ModalService } from './modal.service';
import { DomService } from './dom.service';
import { JarLocationListComponent } from './jar-location-list/jar-location-list.component';
import { DisplayMapComponent } from './display-map/display-map.component';





const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home/:id', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
  { path: 'register/:id', redirectTo: 'home'},
  { path: 'findLocalLocation', component: FindLocalLocationComponent },
  { path: 'locations', component: LocationsComponent, canActivate:[AuthGuardService]},
  { path: '**', component: PageNotFoundComponent}
  

 
];

@NgModule({
  declarations: [
    AppComponent,
    LocationsListComponent,
    LocationRowComponent,
    LocationImageComponent,
    LocationFormComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LocationsComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    FindLocalLocationComponent,
    FindLocationAnywhereComponent,
    InvitationFormComponent,
    PendingInviteReminderComponent,
    JarLocationListComponent,
    DisplayMapComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJRs5Wosw3ztZr03Dxtzx3v2nGUgk4c1I',
      libraries: ["places"]
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,
    LocationDataService,
    InvitationDataService,
    AuthService,
    AuthGuardService,
    ApinewService,
    UserLocationService,
    DomService,
    ModalService
  ],
  entryComponents: [
   PendingInviteReminderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
