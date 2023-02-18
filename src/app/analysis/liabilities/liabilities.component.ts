import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  RxFormBuilder,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { LiabilitiesService } from 'src/app/shared/services/liabilities.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss'],
})
export class LiabilitiesComponent implements OnInit {
  IsNext = false;
  AddPersonalLoan: FormGroup;
  AddCreditCardLoan: FormGroup;
  AddSalaryScrificesLoan: FormGroup;
  AddOtherLoan: FormGroup;
  LaibilityItems: FormArray;
  DurationType = [
    {
      DurationTypeId: 42,
      DurationTypeName: 'Week',
    },
    {
      DurationTypeId: 43,
      DurationTypeName: 'Fortnight',
    },
    {
      DurationTypeId: 44,
      DurationTypeName: 'Month',
    },
    {
      DurationTypeId: 45,
      DurationTypeName: 'Year',
    },
  ];
  ApplicationId: string;
  constructor(
    public _sharedService: SharedService,
    private _formBuilder: FormBuilder,
    private _liabilitiesService: LiabilitiesService,
    private rxFormBuilder: RxFormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    if (this.ApplicationId != undefined) {
      this.GetLiabilities();
    }
    this.AddPersonalLoan = new FormGroup({
      ApplicantLaibilities: new FormArray([]),
    });
    this.AddCreditCardLoan = new FormGroup({
      ApplicantLaibilities: new FormArray([]),
    });
    this.AddSalaryScrificesLoan = new FormGroup({
      ApplicantLaibilities: new FormArray([]),
    });
    this.AddOtherLoan = new FormGroup({
      ApplicantLaibilities: new FormArray([]),
    });
  }
  addApplicantLaibility(LiabilityTypeId): void {
    if (LiabilityTypeId == 1) {
      this.LaibilityItems = this.AddPersonalLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 2) {
      this.LaibilityItems = this.AddCreditCardLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 3) {
      this.LaibilityItems = this.AddSalaryScrificesLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 4) {
      this.LaibilityItems = this.AddOtherLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    }
    this.LaibilityItems.push(this.createApplicantLaibility(LiabilityTypeId));
  }
  createApplicantLaibility(LiabilityTypeId): FormGroup {
    return this._formBuilder.group({
      LiabilityID: [],
      LiabilityTypeId: [LiabilityTypeId],
      Lender: ['', [Validators.required]],
      Balance: ['', [Validators.required]],
      Payment: ['', [Validators.required]],
      PaymentTimePeriod: ['', [Validators.required]],
      ApplicantTypeId: this._formBuilder.array([]),
      CardLimit: [
        '',
        RxwebValidators.required({
          conditionalExpression: (x) => x.LiabilityTypeId == 2,
        }),
      ],
      IsRefinance: ['', [Validators.required]],
    });
  }
  removeApplicantLaibility(index, LiabilityTypeId) {
    if (LiabilityTypeId == 1) {
      this.LaibilityItems = this.AddPersonalLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 2) {
      this.LaibilityItems = this.AddCreditCardLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 3) {
      this.LaibilityItems = this.AddSalaryScrificesLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 4) {
      this.LaibilityItems = this.AddOtherLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    }

    this.LaibilityItems.removeAt(index);
  }
  onApplicantLaibilitySubmit() {
    if (
      this.AddPersonalLoan.invalid ||
      this.AddCreditCardLoan.invalid ||
      this.AddSalaryScrificesLoan.invalid ||
      this.AddOtherLoan.invalid
    ) {
      (<FormArray>(
        this.AddPersonalLoan.get('ApplicantLaibilities')
      )).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
        });
      });
      (<FormArray>(
        this.AddCreditCardLoan.get('ApplicantLaibilities')
      )).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
        });
      });
      (<FormArray>(
        this.AddSalaryScrificesLoan.get('ApplicantLaibilities')
      )).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
        });
      });
      (<FormArray>(
        this.AddOtherLoan.get('ApplicantLaibilities')
      )).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
        });
      });
      return;
    }
    var liabilities = [];
    if (
      this.AddPersonalLoan.value.ApplicantLaibilities != undefined &&
      this.AddPersonalLoan.value.ApplicantLaibilities.length > 0
    ) {
      var obj = {};
      this.AddPersonalLoan.value.ApplicantLaibilities.forEach((i) => {
        debugger;
        i.ApplicantTypeId = this.clearDuplicatesInArray(i.ApplicantTypeId)
        obj = {
          LiabilityID: +i.LiabilityID,
          LiabilityTypeId: +i.LiabilityTypeId,
          Lender: i.Lender,
          Balance: +i.Balance,
          Payment: +i.Payment,
          PaymentTimePeriod: +i.PaymentTimePeriod,
          ApplicantTypeId: i.ApplicantTypeId,
          CardLimit: +i.CardLimit,
          IsRefinance: i.IsRefinance == 'true' ? true : false,
        };
        liabilities.push(obj);
      });
    }
    if (
      this.AddCreditCardLoan.value.ApplicantLaibilities != undefined &&
      this.AddCreditCardLoan.value.ApplicantLaibilities.length > 0
    ) {
      var obj = {};
      this.AddCreditCardLoan.value.ApplicantLaibilities.forEach((i) => {
        obj = {
          LiabilityID: +i.LiabilityID,
          LiabilityTypeId: +i.LiabilityTypeId,
          Lender: i.Lender,
          Balance: +i.Balance,
          Payment: +i.Payment,
          PaymentTimePeriod: +i.PaymentTimePeriod,
          ApplicantTypeId: i.ApplicantTypeId,
          CardLimit: +i.CardLimit,
          IsRefinance: i.IsRefinance == 'true' ? true : false,
        };
        liabilities.push(obj);
      });
    }
    if (
      this.AddSalaryScrificesLoan.value.ApplicantLaibilities != undefined &&
      this.AddSalaryScrificesLoan.value.ApplicantLaibilities.length > 0
    ) {
      var obj = {};
      this.AddSalaryScrificesLoan.value.ApplicantLaibilities.forEach((i) => {
        obj = {
          LiabilityID: +i.LiabilityID,
          LiabilityTypeId: +i.LiabilityTypeId,
          Lender: i.Lender,
          Balance: +i.Balance,
          Payment: +i.Payment,
          PaymentTimePeriod: +i.PaymentTimePeriod,
          ApplicantTypeId: i.ApplicantTypeId,
          CardLimit: +i.CardLimit,
          IsRefinance: i.IsRefinance == 'true' ? true : false,
        };
        liabilities.push(obj);
      });
    }
    if (
      this.AddOtherLoan.value.ApplicantLaibilities != undefined &&
      this.AddOtherLoan.value.ApplicantLaibilities.length > 0
    ) {
      var obj = {};
      this.AddOtherLoan.value.ApplicantLaibilities.forEach((i) => {
        obj = {
          LiabilityID: +i.LiabilityID,
          LiabilityTypeId: +i.LiabilityTypeId,
          Lender: i.Lender,
          Balance: +i.Balance,
          Payment: +i.Payment,
          PaymentTimePeriod: +i.PaymentTimePeriod,
          ApplicantTypeId: i.ApplicantTypeId,
          CardLimit: +i.CardLimit,
          IsRefinance: i.IsRefinance == 'true' ? true : false,
        };
        liabilities.push(obj);
      });
    }
    var obj2 = {
      Liabilities: liabilities,
      ApplicationID: this.ApplicationId,
    };
    this._liabilitiesService.SaveLiabilities(obj2).subscribe((res: any) => {
      this.GetLiabilities();
    });
  }
  onChange(event, index, LiabilityTypeId) {
    if (LiabilityTypeId == 1) {
      const ApplicantLaibilities = (<FormArray>(
        this.AddPersonalLoan.get('ApplicantLaibilities')
      )) as FormArray;
      const Applicants = (<FormArray>(
        ApplicantLaibilities.at(index).get('ApplicantTypeId')
      )) as FormArray;
      if (event.checked) {
        Applicants.push(new FormControl(event.source.value));
      } else {
        const i = Applicants.controls.findIndex(
          (x) => x.value === event.source.value
        );
        Applicants.removeAt(i);
      }
    } else if (LiabilityTypeId == 2) {
      const ApplicantLaibilities = (<FormArray>(
        this.AddCreditCardLoan.get('ApplicantLaibilities')
      )) as FormArray;
      const Applicants = (<FormArray>(
        ApplicantLaibilities.at(index).get('ApplicantTypeId')
      )) as FormArray;
      if (event.checked) {
        Applicants.push(new FormControl(event.source.value));
      } else {
        const i = Applicants.controls.findIndex(
          (x) => x.value === event.source.value
        );
        Applicants.removeAt(i);
      }
    } else if (LiabilityTypeId == 3) {
      const ApplicantLaibilities = (<FormArray>(
        this.AddSalaryScrificesLoan.get('ApplicantLaibilities')
      )) as FormArray;
      const Applicants = (<FormArray>(
        ApplicantLaibilities.at(index).get('ApplicantTypeId')
      )) as FormArray;
      if (event.checked) {
        Applicants.push(new FormControl(event.source.value));
      } else {
        const i = Applicants.controls.findIndex(
          (x) => x.value === event.source.value
        );
        Applicants.removeAt(i);
      }
    } else if (LiabilityTypeId == 4) {
      const ApplicantLaibilities = (<FormArray>(
        this.AddOtherLoan.get('ApplicantLaibilities')
      )) as FormArray;
      const Applicants = (<FormArray>(
        ApplicantLaibilities.at(index).get('ApplicantTypeId')
      )) as FormArray;
      if (event.checked) {
        Applicants.push(new FormControl(event.source.value));
      } else {
        const i = Applicants.controls.findIndex(
          (x) => x.value === event.source.value
        );
        Applicants.removeAt(i);
      }
    }
  }
  GetLiabilitiesForm(LiabilityTypeId) {
    if (LiabilityTypeId == 1) {
      return this.AddPersonalLoan.get('ApplicantLaibilities') as FormArray;
    } else if (LiabilityTypeId == 2) {
      return this.AddCreditCardLoan.get('ApplicantLaibilities') as FormArray;
    } else if (LiabilityTypeId == 3) {
      return this.AddSalaryScrificesLoan.get(
        'ApplicantLaibilities'
      ) as FormArray;
    } else if (LiabilityTypeId == 4) {
      return this.AddOtherLoan.get('ApplicantLaibilities') as FormArray;
    }
  }
  GetLiabilities() {
    var obj = {
      ApplicationId: this.ApplicationId,
    };
    this._liabilitiesService.GetLiabilities(obj).subscribe((res: any) => {
      if (
        res.body.Liabilities != undefined &&
        res.body.Liabilities.length > 0
      ) {
        this.PatchLiabilitiesValue(res.body.Liabilities);
      }
    });
  }
  PatchLiabilitiesValue(Liabilities: any[]) {
    this.GetLiabilitiesForm(1).clear();
    this.GetLiabilitiesForm(2).clear();
    this.GetLiabilitiesForm(3).clear();
    this.GetLiabilitiesForm(4).clear();
    Liabilities.forEach((i) => {
      var applicantsIds = i.ApplicantIds.split(',');
      var form = this._formBuilder.group({
        LiabilityID: i.LiabilityID,
        LiabilityTypeId: i.LiabilityTypeID,
        Lender: [i.Lender, [Validators.required]],
        Balance: [i.Balance, [Validators.required]],
        Payment: [i.Payment, [Validators.required]],
        PaymentTimePeriod: [i.PaymentTimePeriod, [Validators.required]],
        ApplicantTypeId: this._formBuilder.array([]),
        CardLimit: [
          i.CardLimit,
          RxwebValidators.required({
            conditionalExpression: (x) => x.LiabilityTypeId == 2,
          }),
        ],
        IsRefinance:
          i.IsRefinance == false
            ? ['false', [Validators.required]]
            : ['true', [Validators.required]],
      });
      if (i.LiabilityTypeID == 1) {
        this.GetLiabilitiesForm(i.LiabilityTypeID).push(form);
        const ApplicantLaibilities = (<FormArray>(
          this.AddPersonalLoan.get('ApplicantLaibilities')
        )) as FormArray;
        var index = ApplicantLaibilities.value.findIndex(
          (j) => j.LiabilityID == i.LiabilityID
        );
        if (index > -1) {
          const Applicants = (<FormArray>(
            ApplicantLaibilities.at(index).get('ApplicantTypeId')
          )) as FormArray;
          applicantsIds.forEach((c) => {
            Applicants.push(new FormControl(c));
          });
        }
      } else if (i.LiabilityTypeID == 2) {
        this.GetLiabilitiesForm(i.LiabilityTypeID).push(form);
      } else if (i.LiabilityTypeID == 3) {
        this.GetLiabilitiesForm(i.LiabilityTypeID).push(form);
      } else if (i.LiabilityTypeID == 4) {
        this.GetLiabilitiesForm(i.LiabilityTypeID).push(form);
      }
    });
  }
  clearDuplicatesInArray(array) {
    var i = array.length,
      j;

    while (--i) {
      for (j = 0; j < i; j++) {
        if (array[i] === array[j]) {
          array.splice(i, 1);
          break;
        }
      }
    }
    return array;
  }
}
