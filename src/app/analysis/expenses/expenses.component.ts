import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { LivingExpenseService } from 'src/app/shared/services/livingExpense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  Expenses = [
    {
      SortOrder: 1,
      Title: 'Child maintenance payments',
      SubTitle:
        'Court Ordered or Centrelink required maintenance for all children not living with you.',
    },
    {
      SortOrder: 2,
      Title: 'Clothing and personal care',
      SubTitle: 'Clothing, footwear, cosmetics, hairdresser, personal care',
    },
    {
      SortOrder: 3,
      Title: 'Groceries',
      SubTitle:
        'Typical supermarket shop for groceries including food and toiletries',
    },
    {
      SortOrder: 4,
      Title: 'Medical and health',
      SubTitle:
        'Medical and health costs including doctor, dental, optical and pharmaceutical (excluding health insurance)',
    },
    {
      SortOrder: 5,
      Title: 'Owner occupied property utilities, rates and related costs',
      SubTitle:
        'Housing and property expenses on owner occupied property including rates, taxes, levies, body corporate and strata fees, repairs and maintenance, other household items and utilities.',
    },
    {
      SortOrder: 6,
      Title: 'Rented property utilities and related costs',
      SubTitle:
        'Housing and property expenses on the property you are renting including maintenance other household items and utilities.',
    },
    {
      SortOrder: 7,
      Title: 'Transport',
      SubTitle:
        'Public transport, motor vehicle running costs including fuel, servicing, parking and tolls (excluding motor vehicle insurance)',
    },
    {
      SortOrder: 8,
      Title: 'Childcare',
      SubTitle: 'Childcare including nannies',
    },
    {
      SortOrder: 9,
      Title: 'Public school education',
      SubTitle:
        'Public education fees and associated costs (preschool, primary, secondary) including books and uniforms etc.',
    },
    {
      SortOrder: 10,
      Title: 'Private school education',
      SubTitle:
        'Private education fees and associated costs (preschool, primary, secondary) including books and uniforms etc.',
    },
    {
      SortOrder: 11,
      Title: 'Tertiary education (HECS / HELP)',
      SubTitle:
        'Tertiary education fees and associated costs including books etc.',
    },
    {
      SortOrder: 12,
      Title: 'General insurance',
      SubTitle: 'General insurance including home, contents, vehicle',
    },
    {
      SortOrder: 13,
      Title: 'Health insurance',
      SubTitle: 'Health insurance',
    },
    {
      SortOrder: 14,
      Title: 'Other insurance',
      SubTitle: 'Other insurance including life, accident, income protection',
    },
    {
      SortOrder: 15,
      Title: 'Investment property utilities, rates and related costs',
      SubTitle:
        'Housing and property expenses on investment property including rates, taxes, levies, body corporate and strata fees, repairs and maintenance, other household items and utilities',
    },
    {
      SortOrder: 16,
      Title: 'Telephone, internet, pay TV and subscriptions',
      SubTitle:
        'Telephone accounts (home and mobile), internet, pay TV and media streaming subscriptions',
    },
    {
      SortOrder: 17,
      Title: 'Recreation and entertainment',
      SubTitle:
        'Recreation and entertainment including alcohol, tobacco, gambling, restaurants, membership fees, pet care, holidays',
    },
    {
      SortOrder: 18,
      Title: 'Other',
      SubTitle:
        'Unique items not covered in above categories (must be explained further)',
    },
  ];
  ApplicantExpensesForm = this._formBuilder.group({
    ApplicationExpense: this._formBuilder.array([]),
  });

  DurationType = [
    {
      DurationTypeId: 42,
      DurationTypeName: 'Week',
    },
    {
      DurationTypeId: 43,
      DurationTypeName: 'Fortnight',
    },
    {
      DurationTypeId: 44,
      DurationTypeName: 'Month',
    },
    {
      DurationTypeId: 45,
      DurationTypeName: 'Year',
    },
  ];
  ApplicationId: string;
  TotalCost: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _analysisService: AnalysisService,
    private _expenseService: LivingExpenseService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.GetLivingExpenses();
  }

  initGroup(data) {
    this.TotalCost = 0;
    let rows = this.ApplicantExpensesForm.get(
      'ApplicationExpense'
    ) as FormArray;
    rows.clear();
    if (data == undefined || data.length == 0) {
      for (const i of this.Expenses) {
        rows.push(
          this._formBuilder.group({
            Id: [null],
            SortOrder: [i.SortOrder],
            Title: [i.Title],
            SubTitle: [i.SubTitle],
            Cost: [0],
            Comments: [''],
            Duration: [44],
            ApplicationId: [this.ApplicationId],
          })
        );
      }
    }else {
      for (const i of data) {
        rows.push(
          this._formBuilder.group({
            Id: [i.Id],
            SortOrder: [i.SortOrder],
            Title: [i.Title],
            SubTitle: [i.SubTitle],
            Cost: [i.Cost],
            Comments: [i.Comments],
            Duration: [i.Duration],
            ApplicationId: [this.ApplicationId],
          })
        );
        this.TotalCost += i.Cost;
      }

    }
  }
  onLivingExpensesSubmit() {
    let rows = this.ApplicantExpensesForm.get(
      'ApplicationExpense'
    ) as FormArray;
    console.log(rows.value);

    var obj = {
      LivingExpenses: rows.value,
    };
    this._expenseService.SaveLivingExpenses(obj).subscribe((res: any) => {
      this.GetLivingExpenses();
      this.router.navigate(['client/' + this.ApplicationId + '/review']);
    });
  }
  GetLivingExpenses() {
    var obj = {
      ApplicationId: this.ApplicationId,
    };
    this._expenseService.GetLivingExpenses(obj).subscribe((res: any) => {
      this.initGroup(res.body.LivingExpenses);
    });
  }
  CalculateTotalCost(){
    this.TotalCost = 0;
    let rows = this.ApplicantExpensesForm.get(
      'ApplicationExpense'
    ) as FormArray;
    for (const element of rows.value) {
      debugger
      if (element.Duration == 42) {
        this.TotalCost += element.Cost * 4;
      }else if (element.Duration == 43) {
        this.TotalCost += element.Cost * 2;
      }else if (element.Duration == 44) {
        this.TotalCost += element.Cost * 1;
      }else if (element.Duration == 45) {
        this.TotalCost += element.Cost / 12;
      }
    }
  }
}
