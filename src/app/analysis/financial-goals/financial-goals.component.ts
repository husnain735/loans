import { ReturnStatement } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  RxFormBuilder,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-financial-goals',
  templateUrl: './financial-goals.component.html',
  styleUrls: ['./financial-goals.component.scss'],
})
export class FinancialGoalsComponent {
  FinancialGoalsForm: FormGroup;
  ApplicationID: string;
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ApplicationID = params['guid'];
    });
    this.AddFinancialGoalsForm();
    this.getFinancialGoals();
  }

  constructor(private rxFormBuilder: RxFormBuilder, private _analysisService: AnalysisService, private route: ActivatedRoute) {}

  RetirementIncome = ['$40,000', '$50,000', '$60,000', '$70,000', '$80,000'];

  AddFinancialGoalsForm() {
    this.FinancialGoalsForm = this.rxFormBuilder.group({
      FinancialGoalID: null,
      FutureFinancialGoal: ['', [RxwebValidators.required()]],
      IsTaxResident: ['', [RxwebValidators.required()]],
      RetirementAgeIncome: ['', [RxwebValidators.required()]],
    });
  }

  onSubmitForm() {
    debugger;
    if (this.FinancialGoalsForm.invalid) {
      return;
    } else {
      var financialGoals:any = {};
      financialGoals = this.FinancialGoalsForm.value;
      financialGoals.ApplicationID = this.ApplicationID;
      this._analysisService.SaveFinancialGoals(financialGoals).subscribe(res =>{
        this.resetForm();
        this.patchFinancialGoals(res.body);
      })
    }
  }

  resetForm(){
    this.FinancialGoalsForm = undefined;
    this.AddFinancialGoalsForm();
  }

  patchFinancialGoals(i){
    this.FinancialGoalsForm = this.rxFormBuilder.group({
      FinancialGoalID: i.FinancialGoalID,
      FutureFinancialGoal: [i.FutureFinancialGoal, [RxwebValidators.required()]],
      IsTaxResident: [i.IsTaxResident.toString(), [RxwebValidators.required()]],
      RetirementAgeIncome: [i.RetirementAgeIncome, [RxwebValidators.required()]],
    });
    console.log(this.FinancialGoalsForm.value);
  }

  getFinancialGoals(){
    this._analysisService.GetFinancialGoals(this.ApplicationID).subscribe(res =>{
      this.patchFinancialGoals(res.body);
    })
  }
}
