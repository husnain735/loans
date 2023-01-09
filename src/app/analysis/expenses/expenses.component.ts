import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {


  Expenses = [
    {
      Title: 'Child maintenance payments',
      SubTitle: 'Court Ordered or Centrelink required maintenance for all children not living with you.'
    },
    {
      Title: 'Clothing and personal care',
      SubTitle: 'Clothing, footwear, cosmetics, hairdresser, personal care'
    },
    {
      Title: 'Groceries',
      SubTitle: 'Typical supermarket shop for groceries including food and toiletries'
    },
    {
      Title: 'Medical and health',
      SubTitle: 'Medical and health costs including doctor, dental, optical and pharmaceutical (excluding health insurance)'
    },
    {
      Title: 'Owner occupied property utilities, rates and related costs',
      SubTitle: 'Housing and property expenses on owner occupied property including rates, taxes, levies, body corporate and strata fees, repairs and maintenance, other household items and utilities.'
    },
    {
      Title: 'Rented property utilities and related costs',
      SubTitle: 'Housing and property expenses on the property you are renting including maintenance other household items and utilities.'
    },
    {
      Title: 'Transport',
      SubTitle: 'Public transport, motor vehicle running costs including fuel, servicing, parking and tolls (excluding motor vehicle insurance)'
    },
    {
      Title: 'Childcare',
      SubTitle: 'Childcare including nannies'
    },
    {
      Title: 'Public school education',
      SubTitle: 'Public education fees and associated costs (preschool, primary, secondary) including books and uniforms etc.'
    },
    {
      Title: 'Private school education',
      SubTitle: 'Private education fees and associated costs (preschool, primary, secondary) including books and uniforms etc.'
    },
    {
      Title: 'Tertiary education (HECS / HELP)',
      SubTitle: 'Tertiary education fees and associated costs including books etc.'
    },
    {
      Title: 'General insurance',
      SubTitle: 'General insurance including home, contents, vehicle'
    },
    {
      Title: 'Health insurance',
      SubTitle: 'Health insurance'
    },
    {
      Title: 'Other insurance',
      SubTitle: 'Other insurance including life, accident, income protection'
    },
    {
      Title: 'Investment property utilities, rates and related costs',
      SubTitle: 'Housing and property expenses on investment property including rates, taxes, levies, body corporate and strata fees, repairs and maintenance, other household items and utilities'
    },
    {
      Title: 'Telephone, internet, pay TV and subscriptions',
      SubTitle: 'Telephone accounts (home and mobile), internet, pay TV and media streaming subscriptions'
    },
    {
      Title: 'Recreation and entertainment',
      SubTitle: 'Recreation and entertainment including alcohol, tobacco, gambling, restaurants, membership fees, pet care, holidays'
    },
    {
      Title: 'Other',
      SubTitle: 'Unique items not covered in above categories (must be explained further)'
    }
  ]
  ApplicantExpensesForm = this._formBuilder.group({
    ApplicationExpense: this._formBuilder.array([]),
  });
  constructor(private _formBuilder: FormBuilder,private _analysisService: AnalysisService) {

  }
  ngOnInit(){

  }

  initGroup() {
    let rows = this.ApplicantExpensesForm.get('ApplicationExpense') as FormArray;
    this.Expenses.forEach(i => {
      rows.push(this._formBuilder.group({
        Title: [i.Title],
        SubTitle: [i.SubTitle],
        Cost: [''],
        Comments: [''],
        Duration: ['']
      }))
    })
  }
}
