import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { FormFilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    FormFilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule
  ],exports: [
    MaterialModule,
    MatNativeDateModule,
    FormFilterPipe
  ]
})
export class SharedModule { }
