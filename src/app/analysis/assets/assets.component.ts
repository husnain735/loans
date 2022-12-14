import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {
  AssetsDetails: FormGroup;
  States = [
    {
      StatesID: 26,
      StatesName: 'SA'
    },
    {
      StatesID: 27,
      StatesName: 'ACT'
    },
    {
      StatesID: 28,
      StatesName: 'NSW'
    },
    {
      StatesID: 29,
      StatesName: 'NT'
    },
    {
      StatesID: 30,
      StatesName: 'QLD'
    },
    {
      StatesID: 31,
      StatesName: 'TAS'
    },
    {
      StatesID: 32,
      StatesName: 'VIC'
    },
    {
      StatesID: 33,
      StatesName: 'WA'
    }
  ];

  PerRentReceived = [
    {
      PerRentID: 37,
      PerRentName: 'Week'
    },
    {
      PerRentID: 38,
      PerRentName: 'Fortnight'
    },
    {
      PerRentID: 39,
      PerRentName: 'Month'
    },
    {
      PerRentID: 40,
      PerRentName: 'Year'
    }
  ];

  InterestType = [
    {
      InterestTypeID: 41,
      InterestTypeName: 'Variable'
    },
    {
      InterestTypeID: 42,
      InterestTypeName: 'Fixed'
    }
  ];

  Items: FormArray;


  ngOnInit(): void {
    this.AssetsDetails = new FormGroup({
      AssetsDetails: new FormArray([]),
    });
    this.addAssetsDetails();
    
  }
  constructor(private _formBuilder: FormBuilder){}

  createAssetsDetails(): FormGroup {
    return this._formBuilder.group({
      StreetNumber: [''],
      StreetName: [''],
      Suburb: ['', [Validators.required]],
      StateId: ['']
    });
  }
  addAssetsDetails(): void {
    this.Items = this.AssetsDetails.get('AssetsDetails') as FormArray;
    this.Items.push(this.createAssetsDetails());
  }
}
