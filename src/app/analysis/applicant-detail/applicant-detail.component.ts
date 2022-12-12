import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

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
  CitizenshipStatus = [
    {
      CitizenshipStatusID: 18,
      CitizenshipStatusName: 'Citizen'
    },
    {
      CitizenshipStatusID: 19,
      CitizenshipStatusName: 'Permanent Resident'
    },
    {
      CitizenshipStatusID: 20,
      CitizenshipStatusName: 'Visa'
    },
  ]

  EmploymentDetail = [
    {
      EmploymentDetailTypeID: 21,
      EmploymentDetailTypeName: 'PAYG'
    },
    {
      EmploymentDetailTypeID: 22,
      EmploymentDetailTypeName: 'Self Employed'
    },
    {
      EmploymentDetailTypeID: 23,
      EmploymentDetailTypeName: 'Unemployed'
    },
    {
      EmploymentDetailTypeID: 24,
      EmploymentDetailTypeName: 'Home Duties'
    },
    {
      EmploymentDetailTypeID: 25,
      EmploymentDetailTypeName: 'Retired'
    },
  ]

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
  ]
  Basis = [
    {
      BasisID: 34,
      BasisName: 'Full Time'
    },
    {
      BasisID: 35,
      BasisName: 'Part Time'
    },
    {
      BasisID: 36,
      BasisName: 'Casual'
    }]



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
  myGroup = this._formBuilder.group({
    Occupation: ['', Validators.required],
  });
  isLinear = true;
  ADSubmitted = false;
  constructor(private _formBuilder: FormBuilder, private _analysisService: AnalysisService) {

  }
  ngOnInit() {
    this._analysisService.getAllAppicants.next(true);
  }
  get childForms() {
    return this.ApplicantDetailForm.get('ChildrenForm') as FormArray
  }
  addChildren() {
    this.ApplicantDetailForm.controls.ChildrenForm = this._formBuilder.array([]);
    var noOfChildren = this.ApplicantDetailForm.get('NumberOfChildren').value;
    for (let index = 0; index < +noOfChildren; index++) {
      var child;
       child = this._formBuilder.group({
        Age: ['' ,Validators.required],
      })
      this.childForms.push(child);
    }
  }
  onApplicantDetailSubmit(){
    this.ADSubmitted = true
    if(this.ApplicantDetailForm.invalid){
      return
    }
    console.log(this.ApplicantDetailForm.value)
  }
}