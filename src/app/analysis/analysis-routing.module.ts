import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { ApplicantsComponent } from './applicants/applicants.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent,
    children: [
      {
        path: ':guid/applicants',
        component: ApplicantsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
