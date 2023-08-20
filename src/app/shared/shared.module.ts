import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { FormFilterPipe } from './pipes/filter.pipe';
import { FilterPipe } from './pipes/genericFilter.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    FormFilterPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule,
    AngularEditorModule
  ],exports: [
    MaterialModule,
    MatNativeDateModule,
    FormFilterPipe,
    FilterPipe,
    AngularEditorModule
  ]
})
export class SharedModule { }
