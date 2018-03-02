import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationRowComponent } from './location-row/location-row.component';
import { LocationImageComponent } from './location-image/location-image.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { ApiService } from './api.service';
import { LocationDataService } from './location-data.service';



@NgModule({
  declarations: [
    AppComponent,
    LocationsListComponent,
    LocationRowComponent,
    LocationImageComponent,
    LocationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    LocationDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
