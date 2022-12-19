import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { AssetsComponent } from './assets/assets.component';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { ReasonApplicationComponent } from './reason-application/reason-application.component';
import { RelativeComponent } from './relative/relative.component';
import { RiskInsuranceProfileComponent } from './risk-insurance-profile/risk-insurance-profile.component';
import { RetirementPlansComponent } from './retirement-plans/retirement-plans.component';
import { FinancialGoalsComponent } from './financial-goals/financial-goals.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    AnalysisComponent,
    ApplicantsComponent,
    ApplicantDetailComponent,
    AssetsComponent,
    LiabilitiesComponent,
    ReasonApplicationComponent,
    RelativeComponent,
    RiskInsuranceProfileComponent,
    RetirementPlansComponent,
    FinancialGoalsComponent,
    ExpensesComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AnalysisModule { }
