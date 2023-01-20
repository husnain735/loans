import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-reason-application',
  templateUrl: './reason-application.component.html',
  styleUrls: ['./reason-application.component.scss']
})
export class ReasonApplicationComponent implements OnInit {

  ApplicantReasonForm = this._formBuilder.group({
    ApplicationReason: this._formBuilder.array([]),
    Loan: ['', [Validators.required]],
    Status: this._formBuilder.array([])
  });
  ReasonRadioArray = [
    { Id: '1',
      Name: 'Fixed Rate'
    },
    {
      Id: '2',
      Name: 'Variable Rate'
    },
    {
      Id: '3',
      Name: 'Split Loans'
    },
    {
      Id: '4',
      Name: 'Principal & Interest'
    },
    {
      Id: '5',
      Name: 'Interest Only'
    },
    {
      Id: '6',
      Name: 'Interest in advance'
    },
    {
      Id: '7',
      Name: 'Line of Credit'
    },
    {
      Id: '8',
      Name: 'Offset Account'
    },
    {
      Id: '9',
      Name: 'Access to redraw'
    },
    {
      Id: '10',
      Name: 'Access to branch network'
    }
  ]
  ApplicationReason: any = [];
  isSubmitted = false;
  constructor(private _formBuilder: FormBuilder,private _analysisService: AnalysisService) {

  }

  ngOnInit(){
    this.initGroup();
    this.getMeta();
  }

  initGroup() {
    let rows = this.ApplicantReasonForm.get('Status') as FormArray;
    this.ReasonRadioArray.forEach(i => {
      rows.push(this._formBuilder.group({
        Id: [i.Id],
        Name: [i.Name],
        Status: [null]
      }))
    })
  }
  getMeta() {
    this._analysisService.getApplicationMeta().subscribe((res: any) => {
      this.ApplicationReason = res.body.ApplicationReason;
    })
  }
  onChange(event) {
    const interests = <FormArray>this.ApplicantReasonForm.get('ApplicationReason') as FormArray;

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }
}
