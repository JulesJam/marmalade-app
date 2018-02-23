import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';


import { AppComponent } from './app.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationRowComponent } from './location-row/location-row.component';
import { LocationImageComponent } from './location-image/location-image.component';
import { LocationFormComponent } from './location-form/location-form.component';


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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
