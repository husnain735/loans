import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-risk-insurance-profile',
  templateUrl: './risk-insurance-profile.component.html',
  styleUrls: ['./risk-insurance-profile.component.scss']
})
export class RiskInsuranceProfileComponent implements OnInit {
  RiskInsuranceForm: FormGroup

  constructor(private rxFormBuilder: RxFormBuilder) {

  }

  ngOnInit() {
    this.RiskInsuranceForm = this.rxFormBuilder.group({
      ClearCreditFile: ['', [RxwebValidators.required()]],
      RepaymentsOnLiabilities : ['', [RxwebValidators.required()]],
      JobsChanging: ['', [RxwebValidators.required()]],
      JobsChangingSpecification: ['', [RxwebValidators.required({ conditionalExpression: (x) => x.JobsChanging == 1 })]],
      ThingsInsurance: ['', [RxwebValidators.required()]],
      PersonalInsurance: ['', [RxwebValidators.required()]],
      DiscussInsurance: ['', [RxwebValidators.required({ conditionalExpression: (x) => x.PersonalInsurance == 0 && x.ThingsInsurance == 0})]],
    })
  }

  onRiskInsuranceFormSubmit(){
    if (this.RiskInsuranceForm.invalid) {
      this.RiskInsuranceForm.markAllAsTouched();
      return;
    }
    console.log(this.RiskInsuranceForm.value);
  }
}
