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

import { AuthService } from '../auth.service';
import { LocationDataService } from '../location-data.service';
import { UserLocationService } from '../userlocation.service';
import { FindLocalLocationComponent } from '../findLocalLocation/findLocalLocation.component';

import { Location } from '../location';

@Injectable()

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})






export class LocationFormComponent implements OnInit {
  locationForm: FormGroup;
  locationName: any;
  locationAddress: any;
  description: any;
  locationPostcode: any;
  locationMainImage: any;
  entryType: any;
  isHidden: boolean;
  loading: boolean;
  fileToUpload: File = null;
  searchIsDisplayed: boolean = false;
  searchAgain: boolean = false;
  searchType: string;
  userId: string

  newLocation: Location = new Location();

  @Input() locationList: Location[];
  @ViewChild('fileInput') fileInput;

 

  




  constructor(fb: FormBuilder, private locationDataService: LocationDataService, private auth: AuthService,) {
    this.locationForm =fb.group({
      'locationName': ['', Validators.required],
      'locationAddress': ['', Validators.required],
      'description': ['', Validators.required],
      'locationPostcode': ['',Validators.required],
      'entryType': ['',Validators.required],
      'locationMainImage': [''],
      'searchType':[''],
      'userId':['']
      });


    this.locationName = this.locationForm.controls['locationName'];
    this.locationAddress = this.locationForm.controls['locationAddress'];
    this.description = this.locationForm.controls['description'];
    this.locationPostcode = this.locationForm.controls['locationPostcode'];
    this.entryType = this.locationForm.controls['entryType'];

    //this shows how to subscribe to value changes 

    /* 
    this.locationName.valueChanges.subscribe (
      (value: string) => {
        console.log('Name changed to ', value);
      }
    );

    this.locationAddress.valueChanges.subscribe (
      (value: string) => {
        console.log('Town changed to ', value);
      }
    );

    this.locationForm.valueChanges.subscribe (
      (form: any) => {
        console.log('Form Changed to: ', form);
      }
      )*/

    // end of example remove eventually
  }

  locationNotified(locationDetails: Location){
    console.log("Location has been notfied", locationDetails);
    this.locationForm.controls['locationName'].setValue(locationDetails.locationName);
    this.locationForm.controls['locationAddress'].setValue(locationDetails.locationAddress);
    this.locationForm.controls['locationPostcode'].setValue(locationDetails.locationPostcode);
    this.searchIsDisplayed = false;
    this.searchAgain = true;
    
  }

  toggleForm(): void {
    console.log("Map before toggle", this.searchIsDisplayed);
    this.isHidden =!this.isHidden;
    if (this.isHidden){this.searchIsDisplayed = false} else {this.searchIsDisplayed = true};
    console.log("Map after toggle", this.searchIsDisplayed);
  }

  ngOnInit() {
  this.isHidden = true;
  this.searchIsDisplayed = false;
  this.userId = this.auth.getCurrentUserId();

  }


  handleFileInput(files: FileList){
    this.fileToUpload =files.item(0);
    console.log(this.fileToUpload.name);
  }

  onSearchTypeChange(searchType): void{
    
    if(searchType){this.searchIsDisplayed = true};
    this.searchType = searchType;
    this.locationForm.reset();
    this.locationForm.patchValue({
      searchType : this.searchType
    })
    this.fileToUpload = null;
    
    console.log("Location user ID", this.userId);
    console.log("Radio Button changed to", searchType);

  }

  onSubmit(location: Location, locationList): void{

    console.log("location being posted is ", location, "User is ", this.userId)
    location.creatorID = this.userId
   
    
    this.locationDataService  
      .addLocation(location, this.fileToUpload)
      .subscribe(
        newLocation => 
        this.locationList.push(newLocation));

    this.fileToUpload = null;
    this.locationForm.reset();
    this.searchIsDisplayed = false;
    this.isHidden = true;

   
    console.log("location form submitted", location, locationList);
    }

  reloadLocationForm (){
    this.locationForm.reset();
    this.searchIsDisplayed = true;
    this.locationForm.patchValue({
      searchType : this.searchType
    })
  }

}
