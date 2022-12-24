import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss']
})
export class LiabilitiesComponent implements OnInit {

  IsNext = false;
  ApplicantLaibility: FormGroup;
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
  constructor(public _sharedService: SharedService,private _formBuilder: FormBuilder) {

  }
  ngOnInit(){
    this.ApplicantLaibility = new FormGroup({
      ApplicantLaibilities: new FormArray([]),
    });
  }
  addApplicantLaibility(LiabilityTypeId): void {
    this.LaibilityItems = this.ApplicantLaibility.get('ApplicantLaibilities') as FormArray;
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
  removeApplicantLaibility(index) {
    this.LaibilityItems = this.ApplicantLaibility.get('ApplicantLaibilities') as FormArray;
    this.LaibilityItems.removeAt(index);
  }
  onApplicantLaibilitySubmit() {
    if (this.ApplicantLaibility.invalid) {
      (<FormArray>this.ApplicantLaibility.get('ApplicantLaibilities')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
            control.markAsTouched();
        })
      });
      return;
    }
    console.log(this.ApplicantLaibility.value);
  }
}
