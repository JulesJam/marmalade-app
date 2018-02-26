import {Component, OnInit, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';

import { Location } from '../location.model';


@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  myForm: FormGroup;
  name: any;
  town: any;
  isHidden: boolean;

  @Input() locationList: Location[];


  constructor(fb: FormBuilder) {
    this.myForm =fb.group({
      'name': ['', Validators.required],
      'town': ['', Validators.required]
    });

    this.name = this.myForm.controls['name'];
    this.town = this.myForm.controls['town'];

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
    locationList.push(new Location(location.name,'/assets/images/locations/missing.png','',location.town, 5));
    this.myForm.reset();
    console.log("location name ",location.name)
    console.log("location form submitted", location, locationList);
      }

}
