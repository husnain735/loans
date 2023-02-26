import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ReasonForApplicationService } from 'src/app/shared/services/reasonForApplication.service';
import { RiskInsuranceProfileService } from 'src/app/shared/services/riskInsuranceProfile.service';

@Component({
  selector: 'app-risk-insurance-profile',
  templateUrl: './risk-insurance-profile.component.html',
  styleUrls: ['./risk-insurance-profile.component.scss']
})
export class RiskInsuranceProfileComponent implements OnInit {
  RiskInsuranceForm: FormGroup
  ApplicationId: string;


  constructor(private rxFormBuilder: RxFormBuilder,
     private route: ActivatedRoute, private _riskInsuranceProfileService: RiskInsuranceProfileService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    if (this.ApplicationId != undefined) {
      this.GetRiskInsuranceProfile();
    }
    this.RiskInsuranceForm = this.rxFormBuilder.group({
      Id: [''],
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
    var obj = {
      Id: this.RiskInsuranceForm.value.Id,
      ClearCreditFile: +this.RiskInsuranceForm.value.ClearCreditFile,
      RepaymentsOnLiabilities : +this.RiskInsuranceForm.value.RepaymentsOnLiabilities,
      JobsChanging: +this.RiskInsuranceForm.value.JobsChanging,
      JobsChangingSpecification: this.RiskInsuranceForm.value.JobsChangingSpecification,
      ThingsInsurance: +this.RiskInsuranceForm.value.ThingsInsurance,
      PersonalInsurance: +this.RiskInsuranceForm.value.PersonalInsurance,
      DiscussInsurance: +this.RiskInsuranceForm.value.DiscussInsurance,
      ApplicationId: this.ApplicationId
    }
    this._riskInsuranceProfileService.SaveRiskInsuranceProfile(obj).subscribe((res: any) => {
      this.GetRiskInsuranceProfile();
    });
  }
  GetRiskInsuranceProfile(){
    var obj = {
      ApplicationId: this.ApplicationId
    }
    this._riskInsuranceProfileService.GetRiskInsuranceProfile(obj).subscribe((res: any) => {
      this.RiskInsuranceForm = this.rxFormBuilder.group({
        Id: [res.body.Id],
        ClearCreditFile: [res.body.ClearCreditFile, [RxwebValidators.required()]],
        RepaymentsOnLiabilities : [res.body.RepaymentsOnLiabilities, [RxwebValidators.required()]],
        JobsChanging: [res.body.JobsChanging, [RxwebValidators.required()]],
        JobsChangingSpecification: [res.body.JobsChangingSpecification, [RxwebValidators.required({ conditionalExpression: (x) => x.JobsChanging == 1 })]],
        ThingsInsurance: [res.body.ThingsInsurance, [RxwebValidators.required()]],
        PersonalInsurance: [res.body.PersonalInsurance, [RxwebValidators.required()]],
        DiscussInsurance: [res.body.DiscussInsurance, [RxwebValidators.required({ conditionalExpression: (x) => x.PersonalInsurance == 0 && x.ThingsInsurance == 0})]],
      })
    });
  }
}
