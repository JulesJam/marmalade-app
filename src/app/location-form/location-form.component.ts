import {
  Component,
  OnInit,
  Input,
  Injectable,
  ViewChild,
} from '@angular/core';


import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';







import { Observable } from 'rxjs/Observable';

import { LocationDataService } from '../location-data.service';
import { UserLocationService } from '../userlocation.service';
import { MapComponent } from '../map/map.component';






import { Location } from '../location';

@Injectable()

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})






export class LocationFormComponent implements OnInit {
  myForm: FormGroup;
  locationName: any;
  locationTown: any;
  description: any;
  locationPostcode: any;
  locationMainImage: any;
  entryType: any;
  isHidden: boolean;
  data: any;
  loading: boolean;
  fileToUpload: File = null;
  mapIsDisplayed: boolean = false;

  newLocation: Location = new Location();

  @Input() locationList: Location[];
  @ViewChild('fileInput') fileInput;

 

  




  constructor(fb: FormBuilder, private locationDataService: LocationDataService) {
    this.myForm =fb.group({
      'locationName': ['', Validators.required],
      'locationTown': ['', Validators.required],
      'description': ['', Validators.required],
      'locationPostcode': ['',Validators.required],
      'entryType': ['',Validators.required],
      'locationMainImage': ['']
      });


    this.locationName = this.myForm.controls['locationName'];
    this.locationTown = this.myForm.controls['locationTown'];
    this.description = this.myForm.controls['description'];
    this.locationPostcode = this.myForm.controls['locationPostcode'];
    this.entryType = this.myForm.controls['entryType'];
    

    //this shows how to subscribe to value changes 

    /* 
    this.locationName.valueChanges.subscribe (
      (value: string) => {
        console.log('Name changed to ', value);
      }
    );

    this.locationTown.valueChanges.subscribe (
      (value: string) => {
        console.log('Town changed to ', value);
      }
    );

    this.myForm.valueChanges.subscribe (
      (form: any) => {
        console.log('Form Changed to: ', form);
      }
      )*/

    // end of example remove eventually
  }

  locationNotified(locationDetails: any){
    console.log("Location has been notfied", locationDetails);
    this.myForm.controls['locationName'].setValue(locationDetails[0]);
    this.myForm.controls['locationTown'].setValue(locationDetails[2]);
    
  }

  toggleForm(): void {
    this.isHidden =!this.isHidden;
    if(!this.isHidden){this.mapIsDisplayed = true};
  }

  ngOnInit() {
  this.isHidden = true;

  }


  handleFileInput(files: FileList){
    this.fileToUpload =files.item(0);
    console.log(this.fileToUpload.name);
  }

  onSubmit(location: any, locationList): void{

    console.log("location being posted is ", location)
   
    
    this.locationDataService  
      .addLocation(location, this.fileToUpload)
      .subscribe(
        newLocation => 
        this.locationList.push(newLocation));

    this.fileToUpload == null;
    this.myForm.reset();
    this.isHidden = true;
   
    console.log("location form submitted", location, locationList);
    }

}
