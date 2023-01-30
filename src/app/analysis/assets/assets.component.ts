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
    console.log(this.AssetsDetails.value);
    var assetDetails = this.AssetsDetails.value;
    var list = [];
    assetDetails.forEach(i =>{
      var listObj = { 
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
      Mortage: i.Mortgage.forEach(j =>{
        var mortgageObj = {
        Lender: j.Lender,
        InterestTypeID: j.InterestTypeID,
        InterestRate: j.InterestRate,
        Limit: j.Limit,
        Payment: j.Payment,
        PaymentPerID: j.PaymentPerID,
        Balance: j.Balance,
        Refinance: j.Refinance,
        ApplicantType: j.ApplicantType
        };
      })
    };
    list.push(listObj);
  });
    var obj = {
      AssetsDetails: list,
      ApplicationId: this.ApplicationId
    };
    this._analysisService.saveAssets(obj).subscribe(res =>{
      console.log(res);
    })
  }
}
