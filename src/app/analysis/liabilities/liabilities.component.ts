import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { LiabilitiesService } from 'src/app/shared/services/liabilities.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss']
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
      DurationTypeName: 'Week'
    },
    {
      DurationTypeId: 43,
      DurationTypeName: 'Fortnight'
    },
    {
      DurationTypeId: 44,
      DurationTypeName: 'Month'
    },
    {
      DurationTypeId: 45,
      DurationTypeName: 'Year'
    },
  ]
  constructor(public _sharedService: SharedService,private _formBuilder: FormBuilder,
    private _liabilitiesService: LiabilitiesService,
    private rxFormBuilder: RxFormBuilder) {

  }
  ngOnInit(){
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
      this.LaibilityItems = this.AddPersonalLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 2) {
      this.LaibilityItems = this.AddCreditCardLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 3) {
      this.LaibilityItems = this.AddSalaryScrificesLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 4) {
      this.LaibilityItems = this.AddOtherLoan.get('ApplicantLaibilities') as FormArray;
    }
    this.LaibilityItems.push(this.createApplicantLaibility(LiabilityTypeId));
  }
  createApplicantLaibility(LiabilityTypeId): FormGroup {
    return this._formBuilder.group({
      LiabilityTypeId: [LiabilityTypeId],
      Lender: ['',[Validators.required]],
      Balance: ['',[Validators.required]],
      Payment: ['',[Validators.required]],
      LaibilityDurationTypeId: ['',[Validators.required]],
      ApplicantTypeId: this._formBuilder.array([]),
      CardLimit: ['', RxwebValidators.required({ conditionalExpression: (x) => x.LiabilityTypeId == 2 })],
      IsRefinance: ['',[Validators.required]]
    });
  }
  removeApplicantLaibility(index,LiabilityTypeId) {
    if (LiabilityTypeId == 1) {
      this.LaibilityItems = this.AddPersonalLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 2) {
      this.LaibilityItems = this.AddCreditCardLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 3) {
      this.LaibilityItems = this.AddSalaryScrificesLoan.get('ApplicantLaibilities') as FormArray;
    }else if (LiabilityTypeId == 4) {
      this.LaibilityItems = this.AddOtherLoan.get('ApplicantLaibilities') as FormArray;
    }

    this.LaibilityItems.removeAt(index);
  }
  onApplicantLaibilitySubmit() {
    debugger
    if (this.AddPersonalLoan.invalid || this.AddCreditCardLoan.invalid || this.AddSalaryScrificesLoan.invalid
       || this.AddOtherLoan.invalid) {
      (<FormArray>this.AddPersonalLoan.get('ApplicantLaibilities')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
            control.markAsTouched();
        })
      });
      (<FormArray>this.AddCreditCardLoan.get('ApplicantLaibilities')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
            control.markAsTouched();
        })
      });
      (<FormArray>this.AddSalaryScrificesLoan.get('ApplicantLaibilities')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
            control.markAsTouched();
        })
      });
      (<FormArray>this.AddOtherLoan.get('ApplicantLaibilities')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
            control.markAsTouched();
        })
      });
      return;
    }
    console.log(this.AddPersonalLoan.value);
  }
  onChange(event,index,LiabilityTypeId) {
    debugger
    if (LiabilityTypeId == 1) {
      const ApplicantLaibilities = <FormArray>this.AddPersonalLoan.get('ApplicantLaibilities') as FormArray;
      const Applicants = <FormArray>ApplicantLaibilities.at(index).get('ApplicantTypeId') as FormArray;
      if(event.checked) {
        Applicants.push(new FormControl(event.source.value))
      } else {
        const i = Applicants.controls.findIndex(x => x.value === event.source.value);
        Applicants.removeAt(i);
      }
    }else if (LiabilityTypeId == 2) {
      const ApplicantLaibilities = <FormArray>this.AddCreditCardLoan.get('ApplicantLaibilities') as FormArray;
      const Applicants = <FormArray>ApplicantLaibilities.at(index).get('ApplicantTypeId') as FormArray;
      if(event.checked) {
        Applicants.push(new FormControl(event.source.value))
      } else {
        const i = Applicants.controls.findIndex(x => x.value === event.source.value);
        Applicants.removeAt(i);
      }
    }else if (LiabilityTypeId == 3) {
      const ApplicantLaibilities = <FormArray>this.AddSalaryScrificesLoan.get('ApplicantLaibilities') as FormArray;
      const Applicants = <FormArray>ApplicantLaibilities.at(index).get('ApplicantTypeId') as FormArray;
      if(event.checked) {
        Applicants.push(new FormControl(event.source.value))
      } else {
        const i = Applicants.controls.findIndex(x => x.value === event.source.value);
        Applicants.removeAt(i);
      }
    }else if (LiabilityTypeId == 4) {
      const ApplicantLaibilities = <FormArray>this.AddOtherLoan.get('ApplicantLaibilities') as FormArray;
      const Applicants = <FormArray>ApplicantLaibilities.at(index).get('ApplicantTypeId') as FormArray;
      if(event.checked) {
        Applicants.push(new FormControl(event.source.value))
      } else {
        const i = Applicants.controls.findIndex(x => x.value === event.source.value);
        Applicants.removeAt(i);
      }
    }
  }
}
