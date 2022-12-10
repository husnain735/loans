import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule
  ],exports: [
    MaterialModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
