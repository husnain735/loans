import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ApplicationComponent } from './application/application.component';
import { LoansBrokerComponent } from './loans-broker/loans-broker.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ApplicationComponent,
      },
      {
        path: 'Application',
        component: ApplicationComponent,
      },
      {
        path: 'Loans-Broker',
        component: LoansBrokerComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
