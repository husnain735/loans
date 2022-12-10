import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { ApplicantsComponent } from './applicants/applicants.component';

@NgModule({
  declarations: [
    AnalysisComponent,
    ApplicantsComponent
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
