import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RxFormBuilder,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { ApplicantDetailService } from 'src/app/shared/services/applicantDetail.service';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss'],
})
export class ApplicantDetailComponent implements OnInit {
  MaritalStatus = [
    {
      MaritalStatusId: 8,
      MaritalStatusName: 'Single',
    },
    {
      MaritalStatusId: 9,
      MaritalStatusName: 'Married',
    },
    {
      MaritalStatusId: 10,
      MaritalStatusName: 'DeFacto',
    },
    {
      MaritalStatusId: 11,
      MaritalStatusName: 'Seperated',
    },
    {
      MaritalStatusId: 12,
      MaritalStatusName: 'Divorced',
    },
    {
      MaritalStatusId: 13,
      MaritalStatusName: 'Widowed',
    },
    {
      MaritalStatusId: 14,
      MaritalStatusName: 'Other',
    },
  ];
  NumberOfChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  IBORange = [
    {
      IBORangeTypeId: 15,
      IBORangeTypeName: '0 – 3 Months',
    },
    {
      IBORangeTypeId: 16,
      IBORangeTypeName: '3 –12 months',
    },
    {
      IBORangeTypeId: 17,
      IBORangeTypeName: '12 + months',
    },
  ];
  CitizenshipStatus = [
    {
      CitizenshipStatusID: 18,
      CitizenshipStatusName: 'Citizen',
    },
    {
      CitizenshipStatusID: 19,
      CitizenshipStatusName: 'Permanent Resident',
    },
    {
      CitizenshipStatusID: 20,
      CitizenshipStatusName: 'Visa',
    },
  ];
  EmploymentDetail = [
    {
      EmploymentDetailTypeID: 21,
      EmploymentDetailTypeName: 'PAYG',
    },
    {
      EmploymentDetailTypeID: 22,
      EmploymentDetailTypeName: 'Self Employed',
    },
    {
      EmploymentDetailTypeID: 23,
      EmploymentDetailTypeName: 'Unemployed',
    },
    {
      EmploymentDetailTypeID: 24,
      EmploymentDetailTypeName: 'Home Duties',
    },
    {
      EmploymentDetailTypeID: 25,
      EmploymentDetailTypeName: 'Retired',
    },
  ];
  States = [
    {
      StatesID: 26,
      StatesName: 'SA',
    },
    {
      StatesID: 27,
      StatesName: 'ACT',
    },
    {
      StatesID: 28,
      StatesName: 'NSW',
    },
    {
      StatesID: 29,
      StatesName: 'NT',
    },
    {
      StatesID: 30,
      StatesName: 'QLD',
    },
    {
      StatesID: 31,
      StatesName: 'TAS',
    },
    {
      StatesID: 32,
      StatesName: 'VIC',
    },
    {
      StatesID: 33,
      StatesName: 'WA',
    },
  ];
  Basis = [
    {
      BasisID: 34,
      BasisName: 'Full Time',
    },
    {
      BasisID: 35,
      BasisName: 'Part Time',
    },
    {
      BasisID: 36,
      BasisName: 'Casual',
    },
  ];
  OtherIncomeType = [
    {
      OtherIncomeTypeId: 37,
      OtherIncomeName: 'Family Tax Benefit',
    },
    {
      OtherIncomeTypeId: 38,
      OtherIncomeName: 'Pensions',
    },
    {
      OtherIncomeTypeId: 39,
      OtherIncomeName: 'Child Support',
    },
    {
      OtherIncomeTypeId: 40,
      OtherIncomeName: 'Maintenance',
    },
    {
      OtherIncomeTypeId: 41,
      OtherIncomeName: 'Other',
    },
  ];
  OtherIncomeDurationType = [
    {
      OtherIncomeDurationTypeId: 42,
      OtherIncomeDurationTypeName: 'Week',
    },
    {
      OtherIncomeDurationTypeId: 43,
      OtherIncomeDurationTypeName: 'Fortnight',
    },
    {
      OtherIncomeDurationTypeId: 44,
      OtherIncomeDurationTypeName: 'Month',
    },
    {
      OtherIncomeDurationTypeId: 45,
      OtherIncomeDurationTypeName: 'Year',
    },
  ];
  HousingState = [
    {
      HousingStateTypeId: 46,
      HousingStateTypeName: 'Renting',
    },
    {
      HousingStateTypeId: 47,
      HousingStateTypeName: 'Mortgage',
    },
    {
      HousingStateTypeId: 48,
      HousingStateTypeName: 'With parents',
    },
    {
      HousingStateTypeId: 49,
      HousingStateTypeName: 'Home in duty',
    },
    {
      HousingStateTypeId: 50,
      HousingStateTypeName: 'Other',
    },
  ];
  ResidingYear = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];
  ResidingMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  ApplicantDetailForm: FormGroup;
  ApplicantContactInformation = this._formBuilder.group({
    ApplicantContactInformationID: [''],
    PhoneNumber: [''],
    MobileNumber: ['', [Validators.required]],
    EmailAddress: ['', [Validators.required, Validators.email]],
    SkypeAddress: [''],
    IsTaxResident: ['', [Validators.required]],
    Country: [
      '',
      RxwebValidators.required({
        conditionalExpression: (x) => x.IsTaxResident == 'true',
      }),
    ],
    CitizenshipStatusTypeId: [
      '',
      RxwebValidators.required({
        conditionalExpression: (x) => x.IsTaxResident == 'true',
      }),
    ],
  });
  ApplicantEmploymentDetail: FormGroup;
  ApplicantOtherIncome: FormGroup;
  ApplicantAddress: FormGroup;
  ApplicantChildrenDetail: FormGroup;
  Items: FormArray;
  OtherIncomeItems: FormArray;
  ApplicantAddresses: FormArray;
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  ADSubmitted = false;
  ACInformation = false;
  events: any[] = [];
  date: Date;
  IsButtonVisible = true;
  TotalYear: number = 0;
  IsYearMoreThen3: boolean = false;
  ApplicantAddressYears: any[] = [];
  ApplicantAddressMonth: any[] = [];
  IsApplicantAddressMoreThen3: boolean;
  ApplicantId: string;
  ApplicantDetailObj: any;
  navigationSubscription: any;
  ApplicationId: string;
  ApplicantAddressCount = 0;
  ApplicantEmployementDetailCount = 0;
  Step1 = false;
  Step2 = false;
  Step3 = false;
  Step4 = false;
  Step5 = false;
  @ViewChild('stepper') private myStepper: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private applicantDetailService: ApplicantDetailService,
    private rxFormBuilder: RxFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {
    this.ApplicantDetailObj = new Object();
    this.ApplicantDetailForm = this.rxFormBuilder.group({
      ApplicantDetailId: [''],
      ApplicantType: ['1', [Validators.required]],
      SalutationTypeId: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      SurName: ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      MaritalTypeId: new FormControl('', [Validators.required]),
      Specify: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) => x.MaritalTypeId == 14,
        }),
      ],
      DriversLicenceNo: ['', [Validators.required]],
      DriversExpiryDate: ['', [Validators.required]],
      MotherName: ['', [Validators.required]],
      NumberOfChildren: ['', [Validators.required]],
      IBONumber: [''],
      IBORangeTypeId: [''],
    });
    this.navigationSubscription = this.route.params.subscribe((params: any) => {
      this.ApplicantId = params['guid2'];
    });
    this.navigationSubscription = this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.GetApplicantDetail();
    this.ApplicantChildrenDetail = new FormGroup({
      ApplicantChildrenDetails: new FormArray([]),
    });
    this.ApplicantEmploymentDetail = new FormGroup({
      ApplicantEmploymentDetails: new FormArray([]),
    });
    this.ApplicantOtherIncome = new FormGroup({
      ApplicantOtherIncomes: new FormArray([]),
    });
    this.ApplicantAddress = new FormGroup({
      ApplicantAddresses: new FormArray([]),
    });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  get childForms() {
    return this.ApplicantChildrenDetail.get(
      'ApplicantChildrenDetails'
    ) as FormArray;
  }
  addChildren() {
    var noOfChildren = this.ApplicantDetailForm.get('NumberOfChildren').value;
    if (+noOfChildren == 0) {
      var total = this.childForms.value.length;
      for (let index = 0; index < total; index++) {
        var idx = this.childForms.value.length - 1;
        this.childForms.removeAt(idx);
      }
    } else if (+noOfChildren > this.childForms.value.length) {
      total = +noOfChildren - this.childForms.value.length;
      for (let index = 0; index < total; index++) {
        var child;
        child = this.rxFormBuilder.group({
          Age: ['', [Validators.required]],
        });
        this.childForms.push(child);
      }
    } else {
      total = this.childForms.value.length - +noOfChildren;
      for (let index = 0; index < total; index++) {
        var idx = this.childForms.value.length - 1;
        this.childForms.removeAt(idx);
      }
    }
  }
  onApplicantDetailSubmit() {
    this.ADSubmitted = true;
    if (
      this.ApplicantDetailForm.invalid ||
      this.ApplicantChildrenDetail.invalid
    ) {
      return;
    }
    this.Step1 = true;
    var ApplicantDetail = {
      ApplicantDetailId: +this.ApplicantDetailForm.value.ApplicantDetailId,
      ApplicantTypeId: +this.ApplicantDetailForm.value.ApplicantType,
      ApplicantId: this.ApplicantId,
      FirstName: this.ApplicantDetailForm.value.FirstName,
      SurName: this.ApplicantDetailForm.value.SurName,
      MiddleName: this.ApplicantDetailForm.value.MiddleName,
      SalutationTypeId: +this.ApplicantDetailForm.value.SalutationTypeId,
      DateOfBirth: this.ApplicantDetailForm.value.DateOfBirth,
      MaritalTypeId: +this.ApplicantDetailForm.value.MaritalTypeId,
      Specify:
        this.ApplicantDetailForm.value.Specify != ''
          ? this.ApplicantDetailForm.value.Specify
          : null,
      DriversLicenceNo: this.ApplicantDetailForm.value.DriversLicenceNo,
      DriversExpiryDate: this.ApplicantDetailForm.value.DriversExpiryDate,
      MotherName: this.ApplicantDetailForm.value.MotherName,
      NumberOfChildren: +this.ApplicantDetailForm.value.NumberOfChildren,
      IBONumber:
        this.ApplicantDetailForm.value.IBONumber != ''
          ? this.ApplicantDetailForm.value.IBONumber
          : null,
      IBORangeTypeId:
        this.ApplicantDetailForm.value.IBORangeTypeId != ''
          ? this.ApplicantDetailForm.value.IBORangeTypeId
          : null,
    };
    var ApplicantDetailChildrens = this.childForms.value;
    var saveApplicantDetailViewModel = {
      ApplicantDetail: ApplicantDetail,
      ApplicantDetailChildrens: ApplicantDetailChildrens,
    };
    this.applicantDetailService
      .SaveApplicantDetail(saveApplicantDetailViewModel)
      .subscribe(
        (res: any) => {
          this.myStepper.next();
          this.GetApplicantDetail();
        },
        (error) => {}
      );
  }
  onApplicantContactInformationSubmit() {
    this.ACInformation = true;
    if (this.ApplicantContactInformation.invalid) {
      return;
    }
    this.Step3 = true;
    var obj = {
      ApplicantContactInformationID:
        +this.ApplicantContactInformation.value.ApplicantContactInformationID,
      ApplicantId: this.ApplicantId,
      PhoneNumber: this.ApplicantContactInformation.value.PhoneNumber,
      MobileNumber: this.ApplicantContactInformation.value.MobileNumber,
      EmailAddress: this.ApplicantContactInformation.value.EmailAddress,
      SkypeAddress: this.ApplicantContactInformation.value.SkypeAddress,
      IsTaxResident:
        this.ApplicantContactInformation.value.IsTaxResident == 'true'
          ? true
          : false,
      Country: this.ApplicantContactInformation.value.Country,
      CitizenshipStatusTypeID:
        +this.ApplicantContactInformation.value.CitizenshipStatusTypeId,
    };
    this.applicantDetailService.SaveApplicantContactInformation(obj).subscribe(
      (res: any) => {
        this.myStepper.next();
        this.GetApplicantDetail();
      },
      (error) => {}
    );
  }
  onApplicantEmploymentDetailSubmit() {
    debugger
    if (this.TotalYear < 3) {
      this.IsYearMoreThen3 = true;
      return;
    }
    if (this.ApplicantEmploymentDetail.invalid && this.IsYearMoreThen3) {
      return;
    }
    this.Step4 = true;
    var appEmpDetail = [];
    var list = [];
    appEmpDetail = this.GetApplicantEmploymentDetail().value;
    appEmpDetail.forEach((i) => {
      var obj = {
        ApplicantEmployeeDetailsID: +i.ApplicantEmployeeDetailsID,
        PreviousEmployementType: +i.PreviousEmployementType,
        EmploymentTypeId: +i.EmploymentTypeId,
        Occuptation: i.Occupation,
        Employer: i.Employer,
        StreetNumber: i.StreetNumber,
        StreetName: i.StreetName,
        Suburb: i.Suburb,
        StateId: +i.StateId,
        Postcode: i.Postcode,
        WorkPhone: i.WorkPhone,
        BasisTypeId: +i.BasisTypeId,
        StartedDate: i.StartedDate,
        GrossIncome: i.GrossIncome,
      };
      list.push(obj);
    });
    var obj = {
      ApplicantId: this.ApplicantId,
      ApplicantEmployeeDetails: list,
    };
    this.applicantDetailService.SaveApplicantEmployeeDetails(obj).subscribe(
      (res: any) => {
        this.myStepper.next();
        this.GetApplicantDetail();
      },
      (error) => {}
    );
  }
  onApplicantAddressSubmit() {
    debugger
    if (this.ApplicantAddress.invalid && !this.IsApplicantAddressMoreThen3) {
      return;
    }
    this.Step2 = true;
    var appAddress = [];
    appAddress = this.GetApplicantAddress().value;
    var list = [];
    appAddress.forEach((i) => {
      var obj = {
        ApplicantDetailAddressId: +i.ApplicantDetailAddressId,
        HousingStatusTypeId: +i.HousingStatusTypeId,
        MonthTimeResiding: +i.MonthTimeResiding,
        MorePostalAddress: false,
        POBox: i.POBox,
        Postcode: i.Postcode,
        Postcode2: i.Postcode2,
        PreviousAddressType: +i.PreviousAddressType,
        Specify: i.Specify,
        State2TypeId: +i.State2TypeId,
        StateTypeId: +i.StateTypeId,
        StreetName: i.StreetName,
        StreetName2: i.StreetName2,
        StreetNumber: i.StreetNumber,
        StreetNumber2: i.StreetNumber2,
        Suburb: i.Suburb,
        Suburb2: i.Suburb2,
        YearTimeResiding: +i.YearTimeResiding,
      };
      list.push(obj);
    });
    var obj = {
      ApplicantId: this.ApplicantId,
      ApplicantAddresses: list,
    };

    this.applicantDetailService.SaveApplicantDetailAddress(obj).subscribe(
      (res: any) => {
        this.myStepper.next();
        this.GetApplicantDetail();
      },
      (error) => {}
    );
  }
  onApplicantOtherIncomeSubmit() {
    if (this.ApplicantOtherIncome.invalid) {
      return;
    }
    this.Step5 = true;
    var appIncome = [];
    appIncome = this.GetApplicantOtherIncome().value;
    var list = [];
    appIncome.forEach((i) => {
      var obj = {
        ApplicantOtherIncomeId: +i.ApplicantOtherIncomeId,
        OtherIncomeType: +i.OtherIncomeType,
        OtherDetails: i.OtherDetails,
        OtherAmount: +i.OtherAmount,
        OtherDurationType: +i.OtherDurationType,
      };
      list.push(obj);
    });
    var obj = {
      ApplicantId: this.ApplicantId,
      ApplicantOtherIncomes: list,
    };

    this.applicantDetailService.SaveApplicantOtherIncomes(obj).subscribe(
      (res: any) => {
        this.myStepper.next();
        this.GetApplicantDetail();
      },
      (error) => {}
    );
  }
  createApplicantEmploymentDetail(TypeId): FormGroup {
    return this.rxFormBuilder.group({
      ApplicantEmployeeDetailsID: [''],
      PreviousEmployementType: [TypeId],
      EmploymentTypeId: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) => x.PreviousEmployementType == 1,
        }),
      ],
      Occupation: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == '',
        }),
      ],
      Employer: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == '',
        }),
      ],
      StreetNumber: [''],
      StreetName: [''],
      Suburb: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == '',
        }),
      ],
      StateId: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == '',
        }),
      ],
      Postcode: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == '',
        }),
      ],
      WorkPhone: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 || x.EmploymentTypeId == '',
        }),
      ],
      BasisTypeId: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 || x.EmploymentTypeId == '',
        }),
      ],
      StartedDate: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == 23 ||
            x.EmploymentTypeId == 24 ||
            x.EmploymentTypeId == 25 ||
            x.EmploymentTypeId == '',
        }),
      ],
      GrossIncome: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.EmploymentTypeId == 21 ||
            x.EmploymentTypeId == 22 ||
            x.EmploymentTypeId == 25 ||
            x.EmploymentTypeId == '',
        }),
      ],
    });
  }
  addApplicantEmploymentDetail(TypeId): void {
    this.Items = this.ApplicantEmploymentDetail.get(
      'ApplicantEmploymentDetails'
    ) as FormArray;
    this.Items.push(this.createApplicantEmploymentDetail(TypeId));
  }
  removeApplicantEmploymentDetail(id, index) {
    ;
    this.Items = this.ApplicantEmploymentDetail.get(
      'ApplicantEmploymentDetails'
    ) as FormArray;

    if ((id == '' || id == 0) && index != -1) {
      this.Items.removeAt(index);
    } else {
      var obj = {
        ApplicantId: this.ApplicantId,
        ApplicantDetailAddressId: 0,
        ApplicantEmployeeDetailsId: id,
        ApplicantOtherIncomeId: 0,
      };
      this.applicantDetailService.DeleteApplicantDetailsForms(obj).subscribe(
        (res) => {
          this.GetApplicantDetail();
        },
        (error) => {}
      );
    }
  }
  addEvent(type: string, event: any, index) {
    debugger
    var idx = this.events.findIndex((i) => i.Id == index);
    if (idx == -1) {
      var obj = {
        Date: event.value,
        Id: index,
      };
      this.events.push(obj);
    } else {
      this.events[idx].Date = event.value;
    }
    this.TotalYear = 0;
    this.events.forEach((i) => {
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
      const daysInMonth = [
        31,
        february,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

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
    });
    if (this.TotalYear >= 3) {
      this.IsButtonVisible = false;
    } else {
      this.IsButtonVisible = true;
    }
  }
  addApplicantOtherIncome(): void {
    this.OtherIncomeItems = this.ApplicantOtherIncome.get(
      'ApplicantOtherIncomes'
    ) as FormArray;
    this.OtherIncomeItems.push(this.createApplicantOtherIncome());
  }
  createApplicantOtherIncome(): FormGroup {
    return this._formBuilder.group({
      ApplicantOtherIncomeId: [''],
      OtherIncomeType: ['', Validators.required],
      OtherDetails: [''],
      OtherAmount: ['', Validators.required],
      OtherDurationType: ['', Validators.required],
    });
  }
  removeApplicantOtherIncome(id, index) {
    this.OtherIncomeItems = this.ApplicantOtherIncome.get(
      'ApplicantOtherIncomes'
    ) as FormArray;

    if ((id == '' || id == 0) && index != -1) {
      this.OtherIncomeItems.removeAt(index);
    } else {
      var obj = {
        ApplicantId: this.ApplicantId,
        ApplicantDetailAddressId: 0,
        ApplicantEmployeeDetailsId: 0,
        ApplicantOtherIncomeId: id,
      };
      this.applicantDetailService.DeleteApplicantDetailsForms(obj).subscribe(
        (res) => {
          this.GetApplicantDetail();
        },
        (error) => {}
      );
    }
  }
  addApplicantAddress(TypeId): void {
    this.ApplicantAddresses = this.ApplicantAddress.get(
      'ApplicantAddresses'
    ) as FormArray;
    this.ApplicantAddresses.push(this.createApplicantAddress(TypeId));
  }
  createApplicantAddress(TypeId): FormGroup {
    return this.rxFormBuilder.group({
      ApplicantDetailAddressId: [''],
      PreviousAddressType: [TypeId],
      StreetNumber: [''],
      StreetName: [''],
      Suburb: ['', Validators.required],
      StateTypeId: ['', Validators.required],
      Postcode: ['', Validators.required],
      HousingStatusTypeId: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) => x.PreviousAddressType == '',
        }),
      ],
      Specify: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) => x.HousingStatusTypeId == 50,
        }),
      ],
      YearTimeResiding: ['', Validators.required],
      MonthTimeResiding: ['', Validators.required],
      MorePostalAddress: [false],
      StreetNumber2: [''],
      StreetName2: [''],
      POBox: [''],
      Suburb2: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.MorePostalAddress == false && x.PreviousAddressType == '',
        }),
      ],
      State2TypeId: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.MorePostalAddress == false && x.PreviousAddressType == '',
        }),
      ],
      Postcode2: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) =>
            x.MorePostalAddress == false && x.PreviousAddressType == '',
        }),
      ],
    });
  }
  removeApplicantAddress(id, index) {
    ;
    this.ApplicantAddresses = this.ApplicantAddress.get(
      'ApplicantAddresses'
    ) as FormArray;
    if ((id == '' || id == 0) && index != -1) {
      this.ApplicantAddresses.removeAt(index);
    } else {
      var obj = {
        ApplicantId: this.ApplicantId,
        ApplicantDetailAddressId: id,
        ApplicantEmployeeDetailsId: 0,
        ApplicantOtherIncomeId: 0,
      };
      this.applicantDetailService.DeleteApplicantDetailsForms(obj).subscribe(
        (res) => {
          this.GetApplicantDetail();
        },
        (error) => {}
      );
    }
  }
  GetApplicantAddress() {
    return this.ApplicantAddress.get('ApplicantAddresses') as FormArray;
  }
  GetApplicantEmploymentDetail() {
    return this.ApplicantEmploymentDetail.get(
      'ApplicantEmploymentDetails'
    ) as FormArray;
  }
  GetApplicantOtherIncome() {
    return this.ApplicantOtherIncome.get('ApplicantOtherIncomes') as FormArray;
  }
  selectApplicantAddressYear(event, index) {
    var idx = this.ApplicantAddressYears.findIndex((i) => i.Id == index);
    if (idx == -1) {
      var obj = {
        Year: event,
        Id: index,
      };
      this.ApplicantAddressYears.push(obj);
    } else {
      this.ApplicantAddressYears[idx].Year = event;
    }
    var yearCount = this.ApplicantAddressYears.reduce((a, b) => a + b.Year, 0);
    var monthCount = this.ApplicantAddressMonth.reduce(
      (a, b) => a + b.Month,
      0
    );
    if (yearCount < 3) {
      if (yearCount >= 2 && monthCount >= 12) {
        this.IsApplicantAddressMoreThen3 = true;
      } else {
        this.IsApplicantAddressMoreThen3 = false;
      }
    } else {
      this.IsApplicantAddressMoreThen3 = true;
    }
  }
  selectApplicantAddressMonth(event, index) {
    var idx = this.ApplicantAddressMonth.findIndex((i) => i.Id == index);
    if (idx == -1) {
      var obj = {
        Month: event,
        Id: index,
      };
      this.ApplicantAddressMonth.push(obj);
    } else {
      this.ApplicantAddressMonth[idx].Month = event;
    }
    var yearCount = this.ApplicantAddressYears.reduce((a, b) => a + b.Year, 0);
    var monthCount = this.ApplicantAddressMonth.reduce(
      (a, b) => a + b.Month,
      0
    );
    if (yearCount < 3) {
      if (yearCount >= 2 && monthCount >= 12) {
        this.IsApplicantAddressMoreThen3 = true;
      } else {
        this.IsApplicantAddressMoreThen3 = false;
      }
    } else {
      this.IsApplicantAddressMoreThen3 = true;
    }
  }
  GetApplicantDetail() {
    var obj = {
      ApplicantId: this.ApplicantId,
    };
    this.applicantDetailService.GetApplicantDetail(obj).subscribe(
      (res: any) => {
        this.ApplicantDetailObj = {};
        this.ApplicantDetailObj = res.body;
        if (this.ApplicantDetailObj != undefined) {
          if (this.ApplicantDetailObj.ApplicantDetail != undefined) {
            this.PatchApplicationDetailValue(
              this.ApplicantDetailObj.ApplicantDetail,
              this.ApplicantDetailObj.ApplicantDetailChildrens
            );
          }
          if (
            this.ApplicantDetailObj != undefined &&
            this.ApplicantDetailObj.ApplicantDetailAddresses != undefined &&
            this.ApplicantDetailObj.ApplicantDetailAddresses.length > 0
          ) {
            this.PatchApplicationDetailAddressValue(
              this.ApplicantDetailObj.ApplicantDetailAddresses
            );
          } else if (this.ApplicantAddressCount == 0){
              this.addApplicantAddress('');
              this.ApplicantAddressCount++;
          }
          if (this.ApplicantDetailObj.ApplicantContactInformation != undefined) {
            this.PatchApplicantContactInformation(
              this.ApplicantDetailObj.ApplicantContactInformation
            );
          }
          if (
            this.ApplicantDetailObj != undefined &&
            this.ApplicantDetailObj.ApplicantEmployeeDetails != undefined &&
            this.ApplicantDetailObj.ApplicantEmployeeDetails.length > 0
          ) {
            this.PatchApplicantEmploymentDetail(
              this.ApplicantDetailObj.ApplicantEmployeeDetails
            );
          } else if(this.ApplicantEmployementDetailCount == 0) {
            this.addApplicantEmploymentDetail(1);
            this.ApplicantEmployementDetailCount++;
          }
          this.PatchApplicantOtherIncome(
            this.ApplicantDetailObj.ApplicantOtherIncomes
          );
        }
      },
      (error) => {}
    );
  }
  PatchApplicationDetailValue(ApplicantDetailObj, ApplicantChildrenDetails) {
    //this.Step1 = true;
    this.childForms.clear();
    this.ApplicantDetailForm.patchValue({
      ApplicantDetailId: ApplicantDetailObj.ApplicantDetailId.toString(),
      ApplicantType: ApplicantDetailObj.ApplicantTypeId.toString(),
      SalutationTypeId: ApplicantDetailObj.SalutationTypeId.toString(),
      FirstName: ApplicantDetailObj.FirstName,
      SurName: ApplicantDetailObj.SurName,
      MiddleName: ApplicantDetailObj.MiddleName,
      DateOfBirth: ApplicantDetailObj.DateOfBirth,
      MaritalTypeId: ApplicantDetailObj.MaritalTypeId,
      Specify: ApplicantDetailObj.Specify,
      DriversLicenceNo: ApplicantDetailObj.DriversLicenceNo,
      DriversExpiryDate: ApplicantDetailObj.DriversExpiryDate,
      MotherName: ApplicantDetailObj.MotherName,
      NumberOfChildren: ApplicantDetailObj.NumberOfChildren,
      IBONumber: ApplicantDetailObj.IBONumber,
      IBORangeTypeId: ApplicantDetailObj.IBORangeTypeId,
    });
    for (let index = 0; index < ApplicantChildrenDetails.length; index++) {
      var child;
      child = this.rxFormBuilder.group({
        Age: [ApplicantChildrenDetails[index].Age, [Validators.required]],
      });
      this.childForms.push(child);
    }
  }
  PatchApplicationDetailAddressValue(ApplicantDetailAddresses: any[]) {
    //this.Step2 = true;
    this.GetApplicantAddress().clear();
    this.ApplicantAddressYears = [];
    this.ApplicantAddressMonth = [];
    ApplicantDetailAddresses.forEach((i) => {
      var form = this.rxFormBuilder.group({
        ApplicantDetailAddressId: +i.ApplicantDetailAddressId,
        HousingStatusTypeId: +i.HousingStatusTypeId,
        MonthTimeResiding: +i.MonthTimeResiding,
        MorePostalAddress: false,
        POBox: i.POBox,
        Postcode: i.Postcode,
        Postcode2: i.Postcode2,
        PreviousAddressType: +i.PreviousAddressType,
        Specify: i.Specify,
        State2TypeId: +i.State2TypeId,
        StateTypeId: +i.StateTypeId,
        StreetName: i.StreetName,
        StreetName2: i.StreetName2,
        StreetNumber: i.StreetNumber,
        StreetNumber2: i.StreetNumber2,
        Suburb: i.Suburb,
        Suburb2: i.Suburb2,
        YearTimeResiding: +i.YearTimeResiding,
      });
      this.GetApplicantAddress().push(form);
      this.selectApplicantAddressYear(
        +i.YearTimeResiding,
        +i.ApplicantDetailAddressId
      );
      this.selectApplicantAddressMonth(
        +i.YearTimeResiding,
        +i.ApplicantDetailAddressId
      );
    });
  }
  PatchApplicantContactInformation(ApplicantContactInformation) {
    //this.Step3 = true;
    this.ApplicantContactInformation.patchValue({
      ApplicantContactInformationID:
        ApplicantContactInformation.ApplicantContactInformationID.toString(),
      CitizenshipStatusTypeId:
        ApplicantContactInformation.CitizenshipStatusTypeID,
      Country: ApplicantContactInformation.Country,
      EmailAddress: ApplicantContactInformation.EmailAddress,
      IsTaxResident: ApplicantContactInformation.IsTaxResident.toString(),
      MobileNumber: ApplicantContactInformation.MobileNumber,
      PhoneNumber: ApplicantContactInformation.PhoneNumber,
      SkypeAddress: ApplicantContactInformation.SkypeAddress,
    });
  }
  PatchApplicantEmploymentDetail(ApplicantEmploymentDetails: any[]) {
    //this.Step4 = true;
    this.GetApplicantEmploymentDetail().clear();
    this.events = [];
    ApplicantEmploymentDetails.forEach((i) => {
      var form = this.rxFormBuilder.group({
        ApplicantEmployeeDetailsID: [i.ApplicantEmployeeDetailsID],
        PreviousEmployementType: [i.PreviousEmployementType],
        EmploymentTypeId: [
          i.EmploymentTypeId,
          RxwebValidators.required({
            conditionalExpression: (x) => x.PreviousEmployementType == 1,
          }),
        ],
        Occupation: [
          i.Occuptation,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == '',
          }),
        ],
        Employer: [
          i.Employer,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == '',
          }),
        ],
        StreetNumber: [i.StreetNumber],
        StreetName: [i.StreetName],
        Suburb: [
          i.Suburb,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == '',
          }),
        ],
        StateId: [
          i.StateId,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == '',
          }),
        ],
        Postcode: [
          i.Postcode,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == '',
          }),
        ],
        WorkPhone: [
          i.WorkPhone,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 || x.EmploymentTypeId == '',
          }),
        ],
        BasisTypeId: [
          i.BasisTypeId,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 || x.EmploymentTypeId == '',
          }),
        ],
        StartedDate: [
          i.StartedDate,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == 23 ||
              x.EmploymentTypeId == 24 ||
              x.EmploymentTypeId == 25 ||
              x.EmploymentTypeId == '',
          }),
        ],
        GrossIncome: [
          i.GrossIncome,
          RxwebValidators.required({
            conditionalExpression: (x) =>
              x.EmploymentTypeId == 21 ||
              x.EmploymentTypeId == 22 ||
              x.EmploymentTypeId == 25 ||
              x.EmploymentTypeId == '',
          }),
        ],
      });
      var eventObj = {
        value: i.StartedDate
      };
      this.addEvent(null,eventObj,i.ApplicantEmployeeDetailsID)
      this.GetApplicantEmploymentDetail().push(form);
    });
  }
  PatchApplicantOtherIncome(ApplicantOtherIncome: any[]) {
    //this.Step5 = true;
    this.GetApplicantOtherIncome().clear();
    ApplicantOtherIncome.forEach((i) => {
      var form = this._formBuilder.group({
        ApplicantOtherIncomeId: i.ApplicantOtherIncomeId,
        OtherIncomeType: i.OtherIncomeType,
        OtherDetails: i.OtherDetails,
        OtherAmount: i.OtherAmount,
        OtherDurationType: i.OtherDurationType,
      });
      this.GetApplicantOtherIncome().push(form);
    });
  }
  openApplicantDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '200px',
      width: '430px'
    });
  }
  deleteApplicant(){
    var obj = {
      ApplicantId: this.ApplicantId,
      ApplicantDetailAddressId: 0,
      ApplicantEmployeeDetailsId: 0,
      ApplicantOtherIncomeId: 0,
    };
    this.applicantDetailService.DeleteApplicantDetailsForms(obj).subscribe(
      (res) => {
        this.dialog.closeAll();
        this.router.navigate(['client/' + this.ApplicationId + '/applicant']);
      },
      (error) => {}
    );
  }
  ApplicantDetailsCompleted(){
    var obj = {
      ApplicantId: this.ApplicantId,
      ApplicantDetailAddressId: 0,
      ApplicantEmployeeDetailsId: 0,
      ApplicantOtherIncomeId: 0,
    }
    this.applicantDetailService.ApplicantDetailsCompleted(obj).subscribe((res: any) => {
      this.router.navigate(['client/' + this.ApplicationId + '/applicant']);
    }, error => {

    })
  }
}
