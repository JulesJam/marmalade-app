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

import {
  RouterModule,
  Routes
} from '@angular/router';


import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationRowComponent } from './location-row/location-row.component';
import { LocationImageComponent } from './location-image/location-image.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { ApiService } from './api.service';
import { LocationDataService } from './location-data.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LocationsComponent } from './locations/locations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
  { path: 'locations', component: LocationsComponent},
  { path: '**', component: PageNotFoundComponent}
  

 /* // authentication demo
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ LoggedInGuard ]
  },

  // nested
  {
    path: 'products',
    component: ProductsComponent,
    children: childRoutes
  }*/
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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,
    LocationDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
