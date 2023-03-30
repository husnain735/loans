import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { AssetsComponent } from './assets/assets.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FinancialGoalsComponent } from './financial-goals/financial-goals.component';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { ReasonApplicationComponent } from './reason-application/reason-application.component';
import { RelativeComponent } from './relative/relative.component';
import { RetirementPlansComponent } from './retirement-plans/retirement-plans.component';
import { ReviewComponent } from './review/review.component';
import { RiskInsuranceProfileComponent } from './risk-insurance-profile/risk-insurance-profile.component';
const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent,
    children: [
      {
        path: ':guid/applicant',
        component: ApplicantsComponent
      },
      {
        path: ':guid/applicant/:guid2',
        component: ApplicantDetailComponent
      },
      {
        path: ':guid/assets',
        component: AssetsComponent
      },
      {
        path: ':guid/liabilities',
        component: LiabilitiesComponent
      },
      {
        path: ':guid/reason-application',
        component: ReasonApplicationComponent
      },
      {
        path: ':guid/relative',
        component: RelativeComponent
      },
      {
        path: ':guid/risk-insurance-profile',
        component: RiskInsuranceProfileComponent
      },
      {
        path: ':guid/retirement-plans',
        component: RetirementPlansComponent
      },
      {
        path: ':guid/financial-goals',
        component: FinancialGoalsComponent
      },
      {
        path: ':guid/expenses',
        component: ExpensesComponent
      },
      {
        path: ':guid/review',
        component: ReviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
