import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { AssetsComponent } from './assets/assets.component';

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
        path: ':guid/assets/:guid2',
        component: AssetsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
