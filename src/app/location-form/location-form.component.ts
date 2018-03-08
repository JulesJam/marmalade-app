import {
  Component,
  OnInit,
  Input,
  Injectable 
} from '@angular/core';


import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';



import { Observable } from 'rxjs/Observable';

import { LocationDataService } from '../location-data.service';


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

  newLocation: Location = new Location();

  @Input() locationList: Location[];


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
    this.locationMainImage = this.myForm.controls['locationMainImage'];

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
      )
  }

 

  toggleForm(): void {
    this.isHidden =!this.isHidden;
  }

  ngOnInit() {
  this.isHidden = false;
  this.toggleForm();
  }

  onSubmit(location: any, locationList): void{
    console.log("location being posted is ", location)
    if (!location.locationMainImage){location.locationMainImage = "/assets/images/locations/missing.png"}
    
    this.locationDataService  
      .addLocation(location)
      .subscribe(
        (newLocation) => {
        this.locationList.push(newLocation)
      }
      );

  


    this.myForm.reset();
   
    console.log("location form submitted", location, locationList);
    }

}
