import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
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

  AssetType = [
    {
      AssetTypeID: 43,
      AssetTypeName: 'Investments'
    },
    {
      AssetTypeID: 44,
      AssetTypeName: 'Furniture & effects'
    },
    {
      AssetTypeID: 45,
      AssetTypeName: 'Other'
    }
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
  constructor(private _formBuilder: FormBuilder, public _sharedService: SharedService, private rxFormBuilder: RxFormBuilder,
    private _analysisService: AnalysisService,private route: ActivatedRoute
    ) { }

  createAssetsDetails(): FormGroup {
    return this.rxFormBuilder.group({
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
      Mortgage: this.rxFormBuilder.array([{
        Lender: ['', [Validators.required]],
        InterestTypeID: ['', [Validators.required]],
        InterestRate: ['', [Validators.required]],
        Limit: ['', [Validators.required]],
        Payment: ['', [Validators.required]],
        PaymentPerID: ['', [Validators.required]],
        Balance: ['', [Validators.required]],
        Refinance: ['', [Validators.required]],
        ApplicantType: ['']
      }]),
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
      var a = this.fa()
        .at(Index)
        .get('Mortgage') as FormArray;

      return a;
    }
  }

  addMortgage(index: any) {

    return this.fa()
      .at(index)
      .get('Mortgage') as FormArray;
  }

  employee(index: any) {

    this.addMortgage(index).push(this.createMortgage())
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
      ApplicantType: ['']
    })
  }

  createSavingDetails(): FormGroup {
    return this.rxFormBuilder.group({
      Institution: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: ['']
    });
  }

  createSuperannuationDetails(): FormGroup {
    return this.rxFormBuilder.group({
      Institution: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: ['']
    });
  }

  createMotorVehicleDetails(): FormGroup {
    return this.rxFormBuilder.group({
      Make: ['', [Validators.required]],
      Year: ['', [Validators.required]],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: ['']
    });
  }

  createMoreAssetDetails(): FormGroup {
    return this.rxFormBuilder.group({
      AssetTypeID: [''],
      Details: [''],
      EstimatedValue: ['', [Validators.required]],
      OwnerID: ['']
    });
  }

  addAssetsDetails(): void {
    this.Items = this.AssetsDetails.get('AssetsDetails') as FormArray;
    this.Items.push(this.createAssetsDetails());
  }
  removeAssetsDetails(index) {
    this.Items = this.AssetsDetails.get('AssetsDetails') as FormArray;
    this.Items.removeAt(index);
  }

  addSavingDetails(): void {
    this.Items = this.SavingDetails.get('SavingDetails') as FormArray;
    this.Items.push(this.createSavingDetails());
  }
  removeSavingDetails(index) {
    this.Items = this.SavingDetails.get('SavingDetails') as FormArray;
    this.Items.removeAt(index);
  }

  addSuperannuationDetails(): void {
    this.Items = this.SuperannuationDetails.get('SuperannuationDetails') as FormArray;
    this.Items.push(this.createSuperannuationDetails());
  }
  removeSuperannuationDetails(index) {
    this.Items = this.SuperannuationDetails.get('SuperannuationDetails') as FormArray;
    this.Items.removeAt(index);
  }

  addMotorVehicleDetails(): void {
    this.Items = this.MotorVehicleDetails.get('MotorVehicleDetails') as FormArray;
    this.Items.push(this.createMotorVehicleDetails());
  }
  removeMotorVehicleDetails(index) {
    this.Items = this.MotorVehicleDetails.get('MotorVehicleDetails') as FormArray;
    this.Items.removeAt(index);
  }

  addMoreAssetDetails(): void {
    this.Items = this.MoreAssetDetails.get('MoreAssetDetails') as FormArray;
    this.Items.push(this.createMoreAssetDetails());
  }
  removeMoreAssetDetails(index) {
    this.Items = this.MoreAssetDetails.get('MoreAssetDetails') as FormArray;
    this.Items.removeAt(index);
  }

  onSubmitAssets(){
    debugger
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
    assetDetails.forEach(i =>{
      var listObj = {
      DummyPropertyID : this._sharedService.generateGUID(), 
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
      ApplicationReasonID: i.ApplicationReasonID
    };
    if(i.IsMortgage == true){
      i.Mortgage.forEach(j =>{
        var mortgageObj = {
        Lender: j.Lender,
        DummyPropertyID: listObj.DummyPropertyID,
        InterestTypeID: +j.InterestTypeID,
        InterestRate: +j.InterestRate,
        Limit: +j.Limit,
        Payment: +j.Payment,
        PaymentPerID: +j.PaymentPerID,
        Balance: +j.Balance,
        Refinance: +j.Refinance,
        ApplicantType: +j.ApplicantType
        };
        mortgageList.push(mortgageObj);
       
      });
    }

    list.push(listObj);
  });

  savings.forEach(i =>{
    var saving = {
      Institution: i.Institution,
      EstimatedValue: i.EstimatedValue,
      OwnerID: i.OwnerID
    };
    savingsObj.push(saving);
  })

  superannuation.forEach(i =>{
    var superannu = {
      Institution: i.Institution,
      EstimatedValue: i.EstimatedValue,
      OwnerID: i.OwnerID
    };
    superannuationObj.push(superannu);
  })

  motorVehicle.forEach(i =>{
    var mv = {
      Make: i.Make,
      Year: i.Year,
      EstimatedValue: i.EstimatedValue
    };
    motorVehicleObj.push(mv);
  })

  moreAssets.forEach(i =>{
    var massets = {
      AssetTypeID: i.AssetTypeID,
      Details: i.Details,
      EstimatedValue: i.EstimatedValue,
      OwnerID: i.OwnerID
    };
    moreAssetsObj.push(massets);
  })
  

    var obj = {
      AssetsDetails: list,
      Mortgage: mortgageList,
      Savings : savingsObj,
      Superannuation : superannuationObj,
      MotorVehicle : motorVehicleObj,
      MoreAssets : moreAssetsObj,
      ApplicationId: this.ApplicationId 
    };
    this._analysisService.saveAssets(obj).subscribe(res =>{
      console.log(res);
    })
  }

  GetMortgage() {
    return this.AssetsDetails.get(
      'Mortgage'
    ) as FormArray;
  }

  getAllAssets(){
    debugger
    this._analysisService.getAllAssets(this.ApplicationId).subscribe(res =>{
      console.log(res.body);
      if(res.body.AssetsDetails != undefined && res.body.AssetsDetails.length > 0){
        this.patchAssetDetails(res.body.AssetsDetails);
      }
      
    })
  }

  patchAssetDetails(AssetsDetails:any[]){
    this.getAssetDetailsForm().clear();
    AssetsDetails.forEach(i =>{
      var form = this.rxFormBuilder.group({
        StreetNumber: [i.StreetNumber],
        StreetName: [i.StreetName],
        Suburb: [i.Suburb, [Validators.required]],
        StateId: [i.StateId, [Validators.required]],
        PostCode: [i.PostCode, [Validators.required]],
        EstimatedValue: [i.EstimatedValue, [Validators.required]],
        RentReceived: [i.RentReceived, [Validators.required]],
        RentPerID: [i.RentPerID, [Validators.required]],
        IsInvestmentProperty: [i.IsInvestmentProperty],
        IsMortgage: [i.IsMortgage],
        ApplicantType: [i.ApplicantType],
        ApplicationReasonID: [''],
        Mortgage: this.rxFormBuilder.array([{
          Lender: ['', [Validators.required]],
          InterestTypeID: ['', [Validators.required]],
          InterestRate: ['', [Validators.required]],
          Limit: ['', [Validators.required]],
          Payment: ['', [Validators.required]],
          PaymentPerID: ['', [Validators.required]],
          Balance: ['', [Validators.required]],
          Refinance: ['', [Validators.required]],
          ApplicantType: ['']
        }]),
      });
      this.getAssetDetailsForm().push(form);

    })
  }

  getAssetDetailsForm(){
    return this.AssetsDetails.get('AssetsDetails') as FormArray;
  }
}
