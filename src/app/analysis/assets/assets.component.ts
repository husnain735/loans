import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RxFormBuilder,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
  AssetsDetails: FormGroup;
  SavingDetails: FormGroup;
  SuperannuationDetails: FormGroup;
  MotorVehicleDetails: FormGroup;
  MoreAssetDetails: FormGroup;

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

  PerRentReceived = [
    {
      PerRentID: 37,
      PerRentName: 'Week',
    },
    {
      PerRentID: 38,
      PerRentName: 'Fortnight',
    },
    {
      PerRentID: 39,
      PerRentName: 'Month',
    },
    {
      PerRentID: 40,
      PerRentName: 'Year',
    },
  ];

  InterestType = [
    {
      InterestTypeID: 41,
      InterestTypeName: 'Variable',
    },
    {
      InterestTypeID: 42,
      InterestTypeName: 'Fixed',
    },
  ];

  AssetType = [
    {
      AssetTypeID: 46,
      AssetTypeName: 'Investments',
    },
    {
      AssetTypeID: 47,
      AssetTypeName: 'Furniture & effects',
    },
    {
      AssetTypeID: 48,
      AssetTypeName: 'Other',
    },
  ];

  Items: FormArray;
  ApplicationId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.AssetsDetails = new FormGroup({
      AssetsDetails: new FormArray([]),
    });

    this.SavingDetails = new FormGroup({
      SavingDetails: new FormArray([]),
    });

    this.SuperannuationDetails = new FormGroup({
      SuperannuationDetails: new FormArray([]),
    });

    this.MotorVehicleDetails = new FormGroup({
      MotorVehicleDetails: new FormArray([]),
    });

    this.MoreAssetDetails = new FormGroup({
      MoreAssetDetails: new FormArray([]),
    });

    this.getAllAssets();
  }
  constructor(
    private _formBuilder: FormBuilder,
    public _sharedService: SharedService,
    private rxFormBuilder: RxFormBuilder,
    private _analysisService: AnalysisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  createAssetsDetails(guid?:string): FormGroup {
    return this._formBuilder.group({
      PropertyID: [null],
      StreetNumber: [''],
      StreetName: [''],
      Suburb: ['', [Validators.required]],
      StateId: ['', [Validators.required]],
      PostCode: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      RentReceived: ['', [Validators.required]],
      RentPerID: ['', [Validators.required]],
      IsInvestmentProperty: [''],
      IsMortgage: [false],
      ApplicantType: [''],
      ApplicationReasonID: [''],
      RandomId: guid,
      ApplicantTypeId: this._formBuilder.array([]),
      Mortgage: this.rxFormBuilder.array([
        {
          Lender: ['', [Validators.required]],
          InterestTypeID: ['', [Validators.required]],
          InterestRate: ['', [Validators.required]],
          Limit: ['', [Validators.required]],
          Payment: ['', [Validators.required]],
          PaymentPerID: ['', [Validators.required]],
          Balance: ['', [Validators.required]],
          Refinance: ['', [Validators.required]],
          ApplicantType: [''],
        },
      ]),
    });
  }

  onSlideMortgage(item: any) {
    // this.nestedForm(0).push(this.rxFormBuilder.group({
    //   Lender: ['', [Validators.required]],
    //   InterestTypeID: ['', [Validators.required]],
    //   InterestRate: ['', [Validators.required]],
    //   Limit: ['', [Validators.required]],
    //   Payment: ['', [Validators.required]],
    //   PaymentPerID: ['', [Validators.required]],
    //   Balance: ['', [Validators.required]],
    //   Refinance: ['', [Validators.required]]
    // }))
    console.log(this.AssetsDetails.value.AssetsDetails[item]);
  }
  fa() {
    return this.AssetsDetails.get('AssetsDetails') as FormArray;
  }
  nestedForm(Index: number): FormArray {
    if (Index != undefined) {
      var a = this.fa().at(Index).get('Mortgage') as FormArray;

      return a;
    }
  }

  addMortgage(index: any) {
    return this.fa().at(index).get('Mortgage') as FormArray;
  }

  employee(index: any) {
    this.addMortgage(index).push(this.createMortgage());
  }

  createMortgage(): FormGroup {
    return this._formBuilder.group({
      Lender: ['', [Validators.required]],
      InterestTypeID: ['', [Validators.required]],
      InterestRate: ['', [Validators.required]],
      Limit: ['', [Validators.required]],
      Payment: ['', [Validators.required]],
      PaymentPerID: ['', [Validators.required]],
      Balance: ['', [Validators.required]],
      Refinance: ['', [Validators.required]],
      ApplicantType: [''],
    });
  }

  createSavingDetails(guid:string): FormGroup {
    return this._formBuilder.group({
      Institution: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: [''],
      RandomId: guid,
      ApplicantTypeId: this._formBuilder.array([]),
    });
  } 

  createSuperannuationDetails(guid:string): FormGroup {
    return this._formBuilder.group({
      Institution: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: [''],
      RandomId: guid,
      ApplicantTypeId: this._formBuilder.array([]),
    });
  }

  createMotorVehicleDetails(guid:string): FormGroup {
    return this._formBuilder.group({
      Make: ['', [Validators.required]],
      Year: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: [''],
      RandomId: guid,
      ApplicantTypeId: this._formBuilder.array([]),
    });
  }

  createMoreAssetDetails(guid:string): FormGroup {
    return this._formBuilder.group({
      AssetTypeID: [''],
      Details: [''],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: [''],
      RandomId: guid,
      ApplicantTypeId: this._formBuilder.array([]),
    });
  }

  addAssetsDetails(): void {
    debugger
    this.Items = this.AssetsDetails.get('AssetsDetails') as FormArray;
    var guid = this._sharedService.generateGUID();
    this.Items.push(this.createAssetsDetails(guid));
    for (const i of this._sharedService.TotalApplicants) {
      var obj = {
        Name: i.FirstName + ' ' + i.SurName,
        ApplicantId: i.ApplicantId,
        IsChecked: false,
        PropertyId: guid,
      };
      this.ApplicantIds.push(obj);
    }
  }
  removeAssetsDetails(index, id) {

    this.Items = this.AssetsDetails.get('AssetsDetails') as FormArray;
    this.Items.removeAt(index);
    if(id > 0){
      this.deleteAssetDetails(id);
    }
  }

  addSavingDetails(): void {
    debugger
    this.Items = this.SavingDetails.get('SavingDetails') as FormArray;
    var guid = this._sharedService.generateGUID();
    this.Items.push(this.createSavingDetails(guid));
    for (const i of this._sharedService.TotalApplicants) {
      var obj = {
        Name: i.FirstName + ' ' + i.SurName,
        ApplicantId: i.ApplicantId,
        IsChecked: false,
        SavingsID: guid,
      };
      this.ApplicantIds.push(obj);
    }
  }
  removeSavingDetails(index, id) {
    this.Items = this.SavingDetails.get('SavingDetails') as FormArray;
    this.Items.removeAt(index);
    if(id > 0){
      this.deleteSavingDetails(id);
    }
  }

  addSuperannuationDetails(): void {
    this.Items = this.SuperannuationDetails.get(
      'SuperannuationDetails'
    ) as FormArray;
    var guid = this._sharedService.generateGUID();
    this.Items.push(this.createSuperannuationDetails(guid));
    for (const i of this._sharedService.TotalApplicants) {
      var obj = {
        Name: i.FirstName + ' ' + i.SurName,
        ApplicantId: i.ApplicantId,
        IsChecked: false,
        SuperannuationID: guid,
      };
      this.ApplicantIds.push(obj);
    }
  }
  removeSuperannuationDetails(index, id) {
    this.Items = this.SuperannuationDetails.get(
      'SuperannuationDetails'
    ) as FormArray;
    this.Items.removeAt(index);
    if(id > 0){
      this.DeleteSuperannuationDetails(id);
    }
  }

  addMotorVehicleDetails(): void {
    this.Items = this.MotorVehicleDetails.get(
      'MotorVehicleDetails'
    ) as FormArray;
    var guid = this._sharedService.generateGUID();
    this.Items.push(this.createMotorVehicleDetails(guid));
    for (const i of this._sharedService.TotalApplicants) {
      var obj = {
        Name: i.FirstName + ' ' + i.SurName,
        ApplicantId: i.ApplicantId,
        IsChecked: false,
        MotorVehicleID: guid
      };
      this.ApplicantIds.push(obj);
    }
  }
  removeMotorVehicleDetails(index, id) {
    this.Items = this.MotorVehicleDetails.get(
      'MotorVehicleDetails'
    ) as FormArray;
    this.Items.removeAt(index);
    if(id > 0){
      this.deleteMotorVehicleDetails(id);
    }
  }

  addMoreAssetDetails(): void {
    this.Items = this.MoreAssetDetails.get('MoreAssetDetails') as FormArray;
    var guid = this._sharedService.generateGUID();
    this.Items.push(this.createMoreAssetDetails(guid));
    for (const i of this._sharedService.TotalApplicants) {
      var obj = {
        Name: i.FirstName + ' ' + i.SurName,
        ApplicantId: i.ApplicantId,
        IsChecked: false,
        MoreAssetsID: guid,
      };
      this.ApplicantIds.push(obj);
    }
  }
  removeMoreAssetDetails(index, id) {
    this.Items = this.MoreAssetDetails.get('MoreAssetDetails') as FormArray;
    this.Items.removeAt(index);
    if(id > 0){
      this.DeleteMoreAssetDetails(id);
    }
  }


  onSubmitAssets() {
    
    console.log(this.AssetsDetails.value);
    var assetDetails = [];
    assetDetails = this.AssetsDetails.value.AssetsDetails;
    var list = [];

    var savings = [];
    savings = this.SavingDetails.value.SavingDetails;
    var savingsObj = [];

    var superannuation = [];
    superannuation = this.SuperannuationDetails.value.SuperannuationDetails;
    var superannuationObj = [];

    var motorVehicle = [];
    motorVehicle = this.MotorVehicleDetails.value.MotorVehicleDetails;
    var motorVehicleObj = [];

    var moreAssets = [];
    moreAssets = this.MoreAssetDetails.value.MoreAssetDetails;
    var moreAssetsObj = [];

    var mortgageList = [];
    assetDetails.forEach((i) => {
      var listObj = {
        PropertyID : i.PropertyID,
        DummyPropertyID: this._sharedService.generateGUID(),
        StreetNumber: i.StreetNumber,
        StreetName: i.StreetName,
        Suburb: i.Suburb,
        StateId: i.StateId,
        PostCode: i.PostCode,
        EstimatedValue: i.EstimatedValue,
        RentReceived: i.RentReceived,
        RentPerID: i.RentPerID,
        IsInvestmentProperty: i.IsInvestmentProperty,
        IsMortgage: i.IsMortgage,
        ApplicantType: i.ApplicantType,
        ApplicationReasonID: i.ApplicationReasonID,
        ApplicantTypeId: i.ApplicantTypeId
      };
      if (i.IsMortgage == true) {
        i.Mortgage.forEach((j) => {
          var mortgageObj = {
            MortgageID: j.MortgageID,
            Lender: j.Lender,
            DummyPropertyID: listObj.DummyPropertyID,
            InterestTypeID: +j.InterestTypeID,
            InterestRate: +j.InterestRate,
            Limit: +j.Limit,
            Payment: +j.Payment,
            PaymentPerID: +j.PaymentPerID,
            Balance: +j.Balance,
            Refinance: +j.Refinance,
            ApplicantType: +j.ApplicantType,
          };
          mortgageList.push(mortgageObj);
        });
      }

      list.push(listObj);
    });

    savings.forEach((i) => {
      var saving = {
        SavingsID : i.SavingsID,
        Institution: i.Institution,
        EstimatedValue: i.EstimatedValue,
        OwnerID: i.OwnerID,
        ApplicantTypeId: i.ApplicantTypeId
      };
      savingsObj.push(saving);
    });

    superannuation.forEach((i) => {
      var superannu = {
        SuperannuationID : i.SuperannuationID,
        Institution: i.Institution,
        EstimatedValue: i.EstimatedValue,
        OwnerID: i.OwnerID,
        ApplicantTypeId: i.ApplicantTypeId
      };
      superannuationObj.push(superannu);
    });

    motorVehicle.forEach((i) => {
      var mv = {
        MotorVehicleID: i.MotorVehicleID,
        Make: i.Make,
        Year: i.Year,
        EstimatedValue: i.EstimatedValue,
        ApplicantTypeId: i.ApplicantTypeId
      };
      motorVehicleObj.push(mv);
    });

    moreAssets.forEach((i) => {
      var massets = {
        MoreAssetsID : i.MoreAssetsID,
        AssetTypeID: i.AssetTypeID,
        Details: i.Details,
        EstimatedValue: i.EstimatedValue,
        OwnerID: i.OwnerID,
        ApplicantTypeId: i.ApplicantTypeId
      };
      moreAssetsObj.push(massets);
    });

    var obj = {
      AssetsDetails: list,
      Mortgage: mortgageList,
      Savings: savingsObj,
      Superannuation: superannuationObj,
      MotorVehicle: motorVehicleObj,
      MoreAssets: moreAssetsObj,
      ApplicationId: this.ApplicationId,
    };
    this._analysisService.saveAssets(obj).subscribe((res) => {
      console.log(res);
      this.router.navigate(['client/' + this.ApplicationId + '/liabilities']);
    });
  }

  GetMortgage() {
    return this.AssetsDetails.get('Mortgage') as FormArray;
  }

  getAllAssets() {
    ;
    this._analysisService.getAllAssets(this.ApplicationId).subscribe((res) => {
      console.log(res.body);
      if (
        res.body.AssetsDetails != undefined &&
        res.body.AssetsDetails.length > 0
      ) {
        this.patchAssetDetails(res.body.AssetsDetails, res.body.applicants_property_link);
      }
      else{
        this.getAssetDetailsForm().clear();
      }

      if (
        res.body.Savings != undefined &&
        res.body.Savings.length > 0
      ) {
        this.patchSavingDetails(res.body.Savings, res.body.applicants_savings_link);
      }
      else{
        this.getSavingDetailsForm().clear();
      }

      if (
        res.body.Superannuation != undefined &&
        res.body.Superannuation.length > 0
      ) {
        this.patchSuperannuationDetails(res.body.Superannuation, res.body.applicants_superannuation_link);
            }
      else{
        this.getSuperannuationDetailsForm().clear();
      }

      if (
          res.body.MotorVehicle != undefined &&
          res.body.MotorVehicle.length > 0
        ) {
          this.patchMotorVehicleDetails(res.body.MotorVehicle, res.body.applicants_motorVehicle_link);
        
        }
        else{
          this.getMotorVehicleDetailsForm().clear();
        }



        if (
          res.body.MoreAssets != undefined &&
          res.body.MoreAssets.length > 0
        ) {
          this.patchMoreAssets(res.body.MoreAssets, res.body.applicants_moreAssets_link);
        }
        else{
          this.getMoreAssetDetailsForm().clear();
        }

      // }
    });
  }

  patchAssetDetails(AssetsDetails: any[], checkboxArray: any[]) {
    debugger
    this.getAssetDetailsForm().clear();
    AssetsDetails.forEach((i) => {
      var form = this._formBuilder.group({
        PropertyID : [i.PropertyID],
        StreetNumber: [i.StreetNumber],
        StreetName: [i.StreetName],
        Suburb: [i.Suburb, [Validators.required]],
        StateId: [i.StateId, [Validators.required]],
        PostCode: [i.PostCode, [Validators.required]],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        RentReceived: [i.RentReceived, [Validators.required]],
        RentPerID: [(i.PerRentName != undefined ? this.PerRentReceived.find(item => item.PerRentName == i.RentTimePeriod).PerRentID : ''), [Validators.required]],
        IsInvestmentProperty: [i.IsInvestmentProperty],
        IsMortgage: [i.IsMortgage],
        ApplicantType: [i.ApplicantType],
        ApplicationReasonID: [''],
        RandomId: i.PropertyID,
        ApplicantTypeId: this._formBuilder.array([]),
        Mortgage: this.rxFormBuilder.array([
          {
            MortgageID : [i.MortgageID],
            Lender: ['', [Validators.required]],
            InterestTypeID: ['', [Validators.required]],
            InterestRate: ['', [Validators.required]],
            Limit: ['', [Validators.required]],
            Payment: ['', [Validators.required]],
            PaymentPerID: ['', [Validators.required]],
            Balance: ['', [Validators.required]],
            Refinance: ['', [Validators.required]],
            ApplicantType: [''],
          },
        ])
      });

      var idx = checkboxArray.findIndex(
        (j) => j.PropertyId == i.PropertyID
      );
      if (idx > -1) {
        for (const k of this._sharedService.TotalApplicants) {
          var idx2 = checkboxArray.findIndex(
            (j) =>
              j.ApplicantId == k.ApplicantId && j.PropertyId == i.PropertyID
          );
          if (idx2 > -1) {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: true,
              PropertyId: i.PropertyID,
            };
            this.ApplicantIds.push(obj);
          } else {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: false,
              PropertyId: i.PropertyID,
            };
            this.ApplicantIds.push(obj);
          }
        }
      }
      this.getAssetDetailsForm().push(form);
      this.selectChecbox(i.PropertyID, 1);
    }); 

     
    
  }

  patchSavingDetails(SavingDetails: any[], checkboxArray: any[]) {
    this.getSavingDetailsForm().clear();
    SavingDetails.forEach((i) => {
      var form = this._formBuilder.group({
        SavingsID : [i.SavingsID],
        Institution: [i.Institution, [Validators.required]],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        OwnerID: [i.OwnerID],
        RandomId: i.SavingsID,
        ApplicantTypeId: this._formBuilder.array([]),
      });
      var idx = checkboxArray.findIndex(
        (j) => j.SavingsID == i.SavingsID
      );
      if (idx > -1) {
        for (const k of this._sharedService.TotalApplicants) {
          var idx2 = checkboxArray.findIndex(
            (j) =>
              j.ApplicantId == k.ApplicantId && j.SavingsID == i.SavingsID
          );
          if (idx2 > -1) {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: true,
              SavingsID: i.SavingsID,
            };
            this.ApplicantIds.push(obj);
          } else {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: false,
              SavingsID: i.SavingsID,
            };
            this.ApplicantIds.push(obj);
          }
        }
      }
      this.getSavingDetailsForm().push(form);
      this.selectChecbox(i.SavingsID, 2);
    });
  }

  patchSuperannuationDetails(Superannuation: any[], checkboxArray: any[]) {
    this.getSuperannuationDetailsForm().clear();
    Superannuation.forEach((i) => {
      var form = this._formBuilder.group({
        SuperannuationID : [i.SuperannuationID],
        Institution: [i.Institution, [Validators.required]],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        OwnerID: [i.OwnerID],
        RandomId: i.SuperannuationID,
        ApplicantTypeId: this._formBuilder.array([]),
      });
      var idx = checkboxArray.findIndex(
        (j) => j.SuperannuationID == i.SuperannuationID
      );
      if (idx > -1) {
        for (const k of this._sharedService.TotalApplicants) {
          var idx2 = checkboxArray.findIndex(
            (j) =>
              j.ApplicantId == k.ApplicantId && j.SuperannuationID == i.SuperannuationID
          );
          if (idx2 > -1) {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: true,
              SuperannuationID: i.SuperannuationID,
            };
            this.ApplicantIds.push(obj);
          } else {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: false,
              SuperannuationID: i.SuperannuationID,
            };
            this.ApplicantIds.push(obj);
          }
        }
      }
      this.getSuperannuationDetailsForm().push(form);
      this.selectChecbox(i.SuperannuationID, 3);
    });
  }

  patchMotorVehicleDetails(MotorVehicleDetails: any[], checkboxArray: any[]) {
    this.getMotorVehicleDetailsForm().clear();
    MotorVehicleDetails.forEach((i) => {
      var form = this._formBuilder.group({
        MotorVehicleID : [i.MotorVehicleID],
        Make: [i.Make, [Validators.required]],
        Year: [i.Year, [Validators.required]],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        OwnerID: [i.OwnerID],
        RandomId: i.MotorVehicleID,
        ApplicantTypeId: this._formBuilder.array([]),
      });
      var idx = checkboxArray.findIndex(
        (j) => j.MotorVehicleID == i.MotorVehicleID
      );
      if (idx > -1) {
        for (const k of this._sharedService.TotalApplicants) {
          var idx2 = checkboxArray.findIndex(
            (j) =>
              j.ApplicantId == k.ApplicantId && j.MotorVehicleID == i.MotorVehicleID
          );
          if (idx2 > -1) {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: true,
              MotorVehicleID: i.MotorVehicleID,
            };
            this.ApplicantIds.push(obj);
          } else {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: false,
              MotorVehicleID: i.MotorVehicleID,
            };
            this.ApplicantIds.push(obj);
          }
        }
      }
      this.getMotorVehicleDetailsForm().push(form);
      this.selectChecbox(i.MotorVehicleID, 4);
    });
  }

  patchMoreAssets(MoreAssets: any[], checkboxArray: any[]) {
    this.getMoreAssetDetailsForm().clear();
    MoreAssets.forEach((i) => {
      var form = this._formBuilder.group({
        MoreAssetsID : [i.MoreAssetsID],
        AssetTypeID: [i.AssetTypeID],
        Details: [i.Details],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        OwnerID: [i.OwnerID],
        RandomId: i.MoreAssetsID,
        ApplicantTypeId: this._formBuilder.array([]),
      });
      var idx = checkboxArray.findIndex(
        (j) => j.MoreAssetsID == i.MoreAssetsID
      );
      if (idx > -1) {
        for (const k of this._sharedService.TotalApplicants) {
          var idx2 = checkboxArray.findIndex(
            (j) =>
              j.ApplicantId == k.ApplicantId && j.MoreAssetsID == i.MoreAssetsID
          );
          if (idx2 > -1) {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: true,
              MoreAssetsID: i.MoreAssetsID,
            };
            this.ApplicantIds.push(obj);
          } else {
            var obj = {
              Name: k.FirstName + ' ' + k.SurName,
              ApplicantId: k.ApplicantId,
              IsChecked: false,
              MoreAssetsID: i.MoreAssetsID,
            };
            this.ApplicantIds.push(obj);
          }
        }
      }
      this.getMoreAssetDetailsForm().push(form);
      this.selectChecbox(i.MoreAssetsID, 5);
    });
  }

  getAssetDetailsForm() {
    return this.AssetsDetails.get('AssetsDetails') as FormArray;
  }

  getSavingDetailsForm() {
    return this.SavingDetails.get('SavingDetails') as FormArray;
  }

  getSuperannuationDetailsForm() {
    return this.SuperannuationDetails.get('SuperannuationDetails') as FormArray;
  }

  getMotorVehicleDetailsForm() {
    return this.MotorVehicleDetails.get('MotorVehicleDetails') as FormArray;
  }

  getMoreAssetDetailsForm() {
    return this.MoreAssetDetails.get('MoreAssetDetails') as FormArray;
  }

  deleteSavingDetails(id) {

      var obj = {
        PropertyID: 0,
        MortgageID: 0,
        SavingsID: id,
        SuperannuationID: 0,
        MotorVehicleID: 0,
        MoreAssetsID: 0
      };
      this._analysisService.DeleteAssets(obj).subscribe(
        (res) => {
          this.getAllAssets();
        },
        (error) => {}
      );

  }

  DeleteSuperannuationDetails(id) {

      var obj = {
        PropertyID: 0,
        MortgageID: 0,
        SavingsID: 0,
        SuperannuationID: id,
        MotorVehicleID: 0,
        MoreAssetsID: 0
      };
      this._analysisService.DeleteAssets(obj).subscribe(
        (res) => {
          this.getAllAssets();
        },
        (error) => {}
      );

  }

  deleteAssetDetails(id) {

      var obj = {
        PropertyID: id,
        MortgageID: 0,
        SavingsID: 0,
        SuperannuationID: 0,
        MotorVehicleID: 0,
        MoreAssetsID: 0
      };
      this._analysisService.DeleteAssets(obj).subscribe(
        (res) => {
          this.getAllAssets();
        },
        (error) => {}
      );

  }

  deleteMotorVehicleDetails(id) {

      var obj = {
        PropertyID: 0,
        MortgageID: 0,
        SavingsID: 0,
        SuperannuationID: 0,
        MotorVehicleID: id,
        MoreAssetsID: 0
      };
      this._analysisService.DeleteAssets(obj).subscribe(
        (res) => {
          this.getAllAssets();
        },
        (error) => {}
      );

  }

  DeleteMoreAssetDetails(id) {

      var obj = {
        PropertyID: 0,
        MortgageID: 0,
        SavingsID: 0,
        SuperannuationID: 0,
        MotorVehicleID: 0,
        MoreAssetsID: id
      };
      this._analysisService.DeleteAssets(obj).subscribe(
        (res) => {
          this.getAllAssets();
        },
        (error) => {}
      );

  }
  ApplicantIds: any[] = [];

// property 1
// savings 2
// superannuation 3
// motor vehicle 4
// other assets 5

  selectChecbox(id, LiabilityTypeId) {
    if (LiabilityTypeId == 1) {
      const ApplicantProperty = (<FormArray>(
        this.AssetsDetails.get('AssetsDetails')
      )) as FormArray;

      var idx = ApplicantProperty.value.findIndex(
        (i) => i.RandomId == id
      );
      if (idx > -1) {
        const Applicants = (<FormArray>(
          ApplicantProperty.at(idx).get('ApplicantTypeId')
        )) as FormArray;
        Applicants.clear();
        for (const i of this.ApplicantIds) {
          if (i.PropertyId == id) {
            if (i.IsChecked) {
              Applicants.push(new FormControl(i.ApplicantId));
            }
          }
        }
      }
    }
   else if (LiabilityTypeId == 2) {
      const ApplicantProperty = (<FormArray>(
        this.SavingDetails.get('SavingDetails')
      )) as FormArray;

      var idx = ApplicantProperty.value.findIndex(
        (i) => i.RandomId == id
      );
      if (idx > -1) {
        const Applicants = (<FormArray>(
          ApplicantProperty.at(idx).get('ApplicantTypeId')
        )) as FormArray;
        Applicants.clear();
        for (const i of this.ApplicantIds) {
          if (i.SavingsID == id) {
            if (i.IsChecked) {
              Applicants.push(new FormControl(i.ApplicantId));
            }
          }
        }
      }
    }
    else if (LiabilityTypeId == 3) {
      const ApplicantProperty = (<FormArray>(
        this.SuperannuationDetails.get('SuperannuationDetails')
      )) as FormArray;

      var idx = ApplicantProperty.value.findIndex(
        (i) => i.RandomId == id
      );
      if (idx > -1) {
        const Applicants = (<FormArray>(
          ApplicantProperty.at(idx).get('ApplicantTypeId')
        )) as FormArray;
        Applicants.clear();
        for (const i of this.ApplicantIds) {
          if (i.SuperannuationID == id) {
            if (i.IsChecked) {
              Applicants.push(new FormControl(i.ApplicantId));
            }
          }
        }
      }
    }
    else if (LiabilityTypeId == 4) {
      const ApplicantProperty = (<FormArray>(
        this.MotorVehicleDetails.get('MotorVehicleDetails')
      )) as FormArray;

      var idx = ApplicantProperty.value.findIndex(
        (i) => i.RandomId == id
      );
      if (idx > -1) {
        const Applicants = (<FormArray>(
          ApplicantProperty.at(idx).get('ApplicantTypeId')
        )) as FormArray;
        Applicants.clear();
        for (const i of this.ApplicantIds) {
          if (i.MotorVehicleID == id) {
            if (i.IsChecked) {
              Applicants.push(new FormControl(i.ApplicantId));
            }
          }
        }
      }
    }
    else if (LiabilityTypeId == 5) {
      const ApplicantProperty = (<FormArray>(
        this.MoreAssetDetails.get('MoreAssetDetails')
      )) as FormArray;

      var idx = ApplicantProperty.value.findIndex(
        (i) => i.RandomId == id
      );
      if (idx > -1) {
        const Applicants = (<FormArray>(
          ApplicantProperty.at(idx).get('ApplicantTypeId')
        )) as FormArray;
        Applicants.clear();
        for (const i of this.ApplicantIds) {
          if (i.MoreAssetsID == id) {
            if (i.IsChecked) {
              Applicants.push(new FormControl(i.ApplicantId));
            }
          }
        }
      }
    }
  }

}
