import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicationComponent } from './application/application.component';
import { LoansBrokerComponent } from './loans-broker/loans-broker.component';


@NgModule({
  declarations: [
    AdminComponent,
    ApplicationComponent,
    LoansBrokerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
