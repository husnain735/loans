import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { FormFilterPipe } from './pipes/filter.pipe';
import { FilterPipe } from './pipes/genericFilter.pipe';


@NgModule({
  declarations: [
    FormFilterPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule
  ],exports: [
    MaterialModule,
    MatNativeDateModule,
    FormFilterPipe,
    FilterPipe
  ]
})
export class SharedModule { }
