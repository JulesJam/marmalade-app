import {Component, OnInit } from '@angular/core';
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
  name: AbstractControl;
  isHidden: boolean;

  constructor(fb: FormBuilder) {
    this.myForm =fb.group({
      'name': ['',Validators.required]
    });

    this.name = this.myForm.controls['name']

   }

  toggleForm(): void {
    this.isHidden =!this.isHidden;
  }

  ngOnInit() {
  this.isHidden = false;
  this.toggleForm();
  }

  onSubmit(name: any): void{
    console.log("location form submitted", name);
  }

}
