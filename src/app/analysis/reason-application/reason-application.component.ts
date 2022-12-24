import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-reason-application',
  templateUrl: './reason-application.component.html',
  styleUrls: ['./reason-application.component.scss']
})
export class ReasonApplicationComponent implements OnInit {

  ApplicantReasonForm = this._formBuilder.group({
    ApplicationReasonTypeId: this._formBuilder.array([]),
    Loan: ['', [Validators.required]],
    Status: this._formBuilder.array([])
  });
  ReasonRadioArray = [
    {
      Name: 'Fixed Rate'
    },
    {
      Name: 'Variable Rate'
    },
    {
      Name: 'Split Loans'
    },
    {
      Name: 'Principal & Interest'
    },
    {
      Name: 'Interest Only'
    },
    {
      Name: 'Interest in advance'
    },
    {
      Name: 'Line of Credit'
    },
    {
      Name: 'Offset Account'
    },
    {
      Name: 'Access to redraw'
    },
    {
      Name: 'Access to branch network'
    }
  ]

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(){
    this.initGroup();
  }

  initGroup() {
    let rows = this.ApplicantReasonForm.get('Status') as FormArray;
    this.ReasonRadioArray.forEach(i => {
      rows.push(this._formBuilder.group({
        Name: [i.Name],
        Status: [null]
      }))
    })

  }
}
