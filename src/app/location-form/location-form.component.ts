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

import {
 Http,
 Response,
 RequestOptions,
 Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

import { Location } from '../location';

@Injectable()

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})

export class LocationFormComponent implements OnInit {
  myForm: FormGroup;
  name: any;
  town: any;
  description: any;
  postCode: any;
  imageUrl: any;
  entryType: any;
  isHidden: boolean;
  data: any;
  loading: boolean;

  updatedLocation: Location = new Location();

  @Input() locationList: Location[];


  constructor(fb: FormBuilder, private http: Http) {
    this.myForm =fb.group({
      'name': ['', Validators.required],
      'town': ['', Validators.required],
      'description': ['', Validators.required],
      'postCode': ['',Validators.required],
      'entryType': ['',Validators.required],
      'imageUrl': ['']
      });

    this.name = this.myForm.controls['name'];
    this.town = this.myForm.controls['town'];
    this.description = this.myForm.controls['description'];
    this.postCode = this.myForm.controls['postCode'];
    this.entryType = this.myForm.controls['entryType'];
    this.imageUrl = this.myForm.controls['imageUrl'];

    this.name.valueChanges.subscribe (
      (value: string) => {
        console.log('Name changed to ', value);
      }
    );

    this.town.valueChanges.subscribe (
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
    /*locationList.push*/
    console.log("location is ", location)
    let newLocation = {
    "locationName": location.name,
    "locationMainImage": "/assets/images/locations/missing.png",
    "locationTown": location.town,
    "entryType": location.entryType,
    "description": location.description,
    "postCode": location.postCode
    };
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    opts.body = (newLocation);
    this.loading = true;
    
    JSON.stringify(opts);
    console.log ("Stringy opts", opts);

    this.http.post('http://localhost:3000/api/locations', opts)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.updatedLocation = this.data.location;
        this.locationList.push(this.updatedLocation);

        console.log("returned location", this.data,"updatedata",this.updatedLocation, this.locationList)
      
      });


    this.myForm.reset();
   
    console.log("location form submitted", location, locationList);
      }

}
