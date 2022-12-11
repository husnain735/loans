import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  MaritalStatus = [
    {
      MaritalStatusId: 8,
      MaritalStatusName: 'Single'
    },
    {
      MaritalStatusId: 9,
      MaritalStatusName: 'Married'
    },
    {
      MaritalStatusId: 10,
      MaritalStatusName: 'DeFacto'
    },
    {
      MaritalStatusId: 11,
      MaritalStatusName: 'Seperated'
    },
    {
      MaritalStatusId: 12,
      MaritalStatusName: 'Divorced'
    },
    {
      MaritalStatusId: 13,
      MaritalStatusName: 'Widowed'
    },
    {
      MaritalStatusId: 14,
      MaritalStatusName: 'Other'
    },
  ]
  NumberOfChildren = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ]
  IBORange = [
    {
      IBORangeTypeId: 15,
      IBORangeTypeName: '0 – 3 Months'
    },
    {
      IBORangeTypeId: 16,
      IBORangeTypeName: '3 –12 months'
    },
    {
      IBORangeTypeId: 17,
      IBORangeTypeName: '12 + months'
    },
  ]
  ApplicantDetailForm = this._formBuilder.group({
    ApplicantType: ['1', [Validators.required]],
    SalutationTypeId: ['', [Validators.required]],
    FirstName: ['', [Validators.required]],
    SurName: ['', [Validators.required]],
    MiddleName: ['', [Validators.required]],
    DateOfBirth: ['', [Validators.required]],
    MaritalTypeId: new FormControl('', [Validators.required]),
    Specify: ['', RxwebValidators.required({ conditionalExpression: (x) => x.MaritalTypeId == 14 })],
    DriversLicenceNo: ['', [Validators.required]],
    DriversExpiryDate: ['', [Validators.required]],
    MotherName: ['', [Validators.required]],
    NumberOfChildren: ['', [Validators.required]],
    IBONumber: [''],
    IBORangeTypeId: [''],
    ChildrenForm: this._formBuilder.array([]),
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  ADSubmitted = false;
  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit() {

  }
  get childForms() {
    return this.ApplicantDetailForm.get('ChildrenForm') as FormArray
  }
  addChildren() {
    debugger
    var noOfChildren = this.ApplicantDetailForm.get('NumberOfChildren').value;

    for (let index = 0; index < +noOfChildren; index++) {
      var child;
       child = this._formBuilder.group({
        ChildrenArray: ['' ,Validators.required],
      })
      this.childForms.push(child);
    }
  }
  onApplicantDetailSubmit(){
    this.ADSubmitted = true
    if(this.ApplicantDetailForm.invalid){
      return
    }
  }
}
