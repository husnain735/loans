import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application/application.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    MatNativeDateModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ApplicationModule { }
