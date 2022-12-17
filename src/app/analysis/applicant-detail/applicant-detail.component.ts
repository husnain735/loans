import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
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
  OtherIncomeType = [
    {
      OtherIncomeType: 37,
      OtherIncomeName: 'Family Tax Benefit'
    },
    {
      OtherIncomeType: 38,
      OtherIncomeName: 'Pensions'
    }
    ,
    {
      OtherIncomeType: 39,
      OtherIncomeName: 'Child Support'
    }
    ,
    {
      OtherIncomeType: 40,
      OtherIncomeName: 'Maintenance'
    }
    ,
    {
      OtherIncomeType: 41,
      OtherIncomeName: 'Other'
    }
  ]
  OtherIncomeDurationType = [
    {
      OtherIncomeDurationTypeId: 42,
      OtherIncomeDurationTypeName: 'Week'
    },
    {
      OtherIncomeDurationTypeId: 43,
      OtherIncomeDurationTypeName: 'Fortnight'
    },
    {
      OtherIncomeDurationTypeId: 44,
      OtherIncomeDurationTypeName: 'Month'
    },
    {
      OtherIncomeDurationTypeId: 45,
      OtherIncomeDurationTypeName: 'Year'
    },
  ]
  HousingState = [
    {
      HousingStateTypeId: 46,
      HousingStateTypeName: 'Renting'
    },
    {
      HousingStateTypeId: 47,
      HousingStateTypeName: 'Mortgage'
    },
    {
      HousingStateTypeId: 48,
      HousingStateTypeName: 'With parents'
    },
    {
      HousingStateTypeId: 49,
      HousingStateTypeName: 'Home in duty'
    },
    {
      HousingStateTypeId: 50,
      HousingStateTypeName: 'Other'
    },
  ]
  ResidingYear = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  ]
  ResidingMonth = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
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
  ApplicantContactInformation = this._formBuilder.group({
    PhoneNumber: [''],
    MobileNumber: ['', [Validators.required]],
    EmailAddress: ['', [Validators.required, Validators.email]],
    SkypeAddress: [''],
    IsTaxResident: ['', [Validators.required]],
    Country: ['', RxwebValidators.required({ conditionalExpression: (x) => x.IsTaxResident == 'true' })],
    CitizenshipStatusTypeId: ['', RxwebValidators.required({ conditionalExpression: (x) => x.IsTaxResident == 'true' })]
  });
  ApplicantEmploymentDetail: FormGroup;
  ApplicantOtherIncome: FormGroup;
  ApplicantAddress: FormGroup;
  Items: FormArray;
  OtherIncomeItems: FormArray;
  ApplicantAddresses: FormArray;
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  ADSubmitted = false;
  ACInformation = false;
  events: any[] = [
  ];
  date: Date;
  IsButtonVisible = true;
  TotalYear: number = 0;
  IsYearMoreThen3: boolean = false;
  ApplicantAddressYears: any[] = [];
  ApplicantAddressMonth: any[] = [];
  IsApplicantAddressMoreThen3: boolean;
  constructor(private _formBuilder: FormBuilder, private _analysisService: AnalysisService,
    private rxFormBuilder: RxFormBuilder) {

  }
  ngOnInit() {
    this._analysisService.getAllAppicants.next(true);
    this.ApplicantEmploymentDetail = new FormGroup({
      ApplicantEmploymentDetails: new FormArray([]),
    });
    this.ApplicantOtherIncome = new FormGroup({
      ApplicantOtherIncomes: new FormArray([]),
    });
    this.ApplicantAddress = new FormGroup({
      ApplicantAddresses: new FormArray([]),
    });
    this.addApplicantEmploymentDetail(1);
    this.addApplicantAddress('');
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
        Age: ['', Validators.required],
      })
      this.childForms.push(child);
    }
  }
  onApplicantDetailSubmit() {
    this.ADSubmitted = true
    if (this.ApplicantDetailForm.invalid) {
      return;
    }
    console.log(this.ApplicantDetailForm.value)
  }
  onApplicantContactInformationSubmit() {
    this.ACInformation = true;
    if (this.ApplicantContactInformation.invalid) {
      return;
    }
  }
  onApplicantEmploymentDetailSubmit() {
    debugger
    if (this.TotalYear < 3) {
      this.IsYearMoreThen3 = true;
    }
    if (this.ApplicantEmploymentDetail.invalid && this.IsYearMoreThen3) {
      return;
    }
    console.log(this.ApplicantEmploymentDetail.value);
  }
  onApplicantAddressSubmit() {
    debugger
    if (this.ApplicantAddress.invalid) {
      return;
    }
    console.log(this.ApplicantEmploymentDetail.value);
  }
  createApplicantEmploymentDetail(TypeId): FormGroup {
    return this.rxFormBuilder.group({
      PreviousEmployementType: [TypeId],
      EmploymentTypeId: ['', RxwebValidators.required({ conditionalExpression: (x) => x.PreviousEmployementType == 1 })],
      Occupation: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == '' })],
      Employer: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == '' })],
      StreetNumber: [''],
      StreetName: [''],
      Suburb: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == '' })],
      StateId: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == '' })],
      Postcode: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == '' })],
      WorkPhone: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == '' })],
      BasisTypeId: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == '' })],
      StartedDate: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == 23 || x.EmploymentTypeId == 24 || x.EmploymentTypeId == 25 || x.EmploymentTypeId == '' })],
      GrossIncome: ['', RxwebValidators.required({ conditionalExpression: (x) => x.EmploymentTypeId == 21 || x.EmploymentTypeId == 22 || x.EmploymentTypeId == 25 || x.EmploymentTypeId == '' })]
    });
  }
  addApplicantEmploymentDetail(TypeId): void {
    this.Items = this.ApplicantEmploymentDetail.get('ApplicantEmploymentDetails') as FormArray;
    this.Items.push(this.createApplicantEmploymentDetail(TypeId));

  }
  removeApplicantEmploymentDetail(index) {
    this.Items = this.ApplicantEmploymentDetail.get('ApplicantEmploymentDetails') as FormArray;
    this.Items.removeAt(index);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>, index) {
    var idx = this.events.findIndex(i => i.Id == index);
    if (idx == -1) {
      var obj = {
        Date: event.value,
        Id: index
      }
      this.events.push(obj);
    } else {
      this.events[idx].Date = event.value;
    }
    this.TotalYear = 0;
    this.events.forEach(i => {
      var startDate = new Date(i.Date);
      var endingDate = new Date();
      // user not pass endingDate then set current date as end date.
      if (!endingDate) {
        endingDate = new Date();
      }
      let endDate = new Date(endingDate);
      // chack start date and end date and base on condication alter date.
      if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
      }
      // This is for leap year.
      const startYear = startDate.getFullYear();
      const february =
        (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
          ? 29
          : 28;
      const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      let yearDiff = endDate.getFullYear() - startYear;
      let monthDiff = endDate.getMonth() - startDate.getMonth();
      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }
      let dayDiff = endDate.getDate() - startDate.getDate();
      let hourDiff = endDate.getHours() - startDate.getHours();
      let minuteDiff = endDate.getMinutes() - startDate.getMinutes();
      let secondDiff = endDate.getSeconds() - startDate.getSeconds();
      if (dayDiff < 0) {
        if (monthDiff > 0) {
          monthDiff--;
        } else {
          yearDiff--;
          monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
      }

      this.TotalYear += yearDiff;
      if (this.TotalYear >= 3) {
        this.IsYearMoreThen3 = false;
      }
    })
    if (this.TotalYear >= 3) {
      this.IsButtonVisible = false;
    } else {
      this.IsButtonVisible = true;
    }
  }
  addApplicantOtherIncome(): void {
    this.OtherIncomeItems = this.ApplicantOtherIncome.get('ApplicantOtherIncomes') as FormArray;
    this.OtherIncomeItems.push(this.createApplicantOtherIncome());
  }
  createApplicantOtherIncome(): FormGroup {
    return this._formBuilder.group({
      OtherIncomeType: ['', Validators.required],
      OtherDetails: [''],
      OtherAmount: ['', Validators.required],
      OtherDurationType: ['', Validators.required],
    });
  }
  removeApplicantOtherIncome(index) {
    this.OtherIncomeItems = this.ApplicantOtherIncome.get('ApplicantOtherIncomes') as FormArray;
    this.OtherIncomeItems.removeAt(index);
  }
  addApplicantAddress(TypeId): void {
    this.ApplicantAddresses = this.ApplicantAddress.get('ApplicantAddresses') as FormArray;
    this.ApplicantAddresses.push(this.createApplicantAddress(TypeId));
  }
  createApplicantAddress(TypeId): FormGroup {
    return this.rxFormBuilder.group({
    PreviousAddressType: [TypeId],
    StreetNumber: [''],
    StreetName: [''],
    Suburb: ['', Validators.required],
    StateTypeId: ['', Validators.required],
    Postcode: ['', Validators.required],
    HousingStatusTypeId: ['' , RxwebValidators.required({ conditionalExpression: (x) => x.PreviousAddressType == '' })],
    Specify: ['' , RxwebValidators.required({ conditionalExpression: (x) => x.HousingStatusTypeId == 50 })],
    YearTimeResiding: ['', Validators.required],
    MonthTimeResiding: ['', Validators.required],
    MorePostalAddress: [false],
    StreetNumber2: [''],
    StreetName2: [''],
    POBox: [''],
    Suburb2: ['' , RxwebValidators.required({ conditionalExpression: (x) => x.MorePostalAddress == false && x.PreviousAddressType == '' })],
    State2TypeId: ['' , RxwebValidators.required({ conditionalExpression: (x) => x.MorePostalAddress == false && x.PreviousAddressType == '' })],
    Postcode2: ['' , RxwebValidators.required({ conditionalExpression: (x) => x.MorePostalAddress == false && x.PreviousAddressType == '' })],
    });
  }
  removeApplicantAddress(index) {
    this.ApplicantAddresses = this.ApplicantAddress.get('ApplicantAddresses') as FormArray;
    this.ApplicantAddresses.removeAt(index);
  }
  selectApplicantAddressYear(event,index){
    debugger
    var idx = this.ApplicantAddressYears.findIndex(i => i.Id == index);
    if (idx == -1) {
      var obj = {
        Year: event,
        Id: index
      }
      this.ApplicantAddressYears.push(obj);
    } else {
      this.ApplicantAddressYears[idx].Year = event;
    }
     var yearCount  = this.ApplicantAddressYears.reduce((a, b) => a + b.Year, 0);
     var monthCount = this.ApplicantAddressMonth.reduce((a, b) => a + b.Month, 0);
     if (yearCount < 3) {
      if (yearCount >= 2 && monthCount >= 12) {
        this.IsApplicantAddressMoreThen3 = true;
      }else {
        this.IsApplicantAddressMoreThen3 = false;
      }
     }else {
      this.IsApplicantAddressMoreThen3 = true;
     }
  }
  selectApplicantAddressMonth(event,index){
    debugger
    var idx = this.ApplicantAddressMonth.findIndex(i => i.Id == index);
    if (idx == -1) {
      var obj = {
        Month: event,
        Id: index
      }
      this.ApplicantAddressMonth.push(obj);
    } else {
      this.ApplicantAddressMonth[idx].Month = event;
    }
     var yearCount  = this.ApplicantAddressYears.reduce((a, b) => a + b.Year, 0);
     var monthCount = this.ApplicantAddressMonth.reduce((a, b) => a + b.Month, 0);
     if (yearCount < 3) {
      if (yearCount >= 2 && monthCount >= 12) {
        this.IsApplicantAddressMoreThen3 = true;
      }else {
        this.IsApplicantAddressMoreThen3 = false;
      }
     }else {
      this.IsApplicantAddressMoreThen3 = true;
     }
  }
}
