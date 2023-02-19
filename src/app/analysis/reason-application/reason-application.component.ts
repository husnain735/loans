import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { ReasonForApplicationService } from 'src/app/shared/services/reasonForApplication.service';

@Component({
  selector: 'app-reason-application',
  templateUrl: './reason-application.component.html',
  styleUrls: ['./reason-application.component.scss']
})
export class ReasonApplicationComponent implements OnInit {

  ApplicantReasonForm = this._formBuilder.group({
    ReasonForApplicationId: null,
    ApplicationReason: this._formBuilder.array([]),
    Loan: ['', [Validators.required]],
    Status: this._formBuilder.array([])
  });
  ReasonRadioArray = [
    { Id: 1,
      Name: 'Fixed Rate'
    },
    {
      Id: 2,
      Name: 'Variable Rate'
    },
    {
      Id: 3,
      Name: 'Split Loans'
    },
    {
      Id: 4,
      Name: 'Principal & Interest'
    },
    {
      Id: 5,
      Name: 'Interest Only'
    },
    {
      Id: 6,
      Name: 'Interest in advance'
    },
    {
      Id: 7,
      Name: 'Line of Credit'
    },
    {
      Id: 8,
      Name: 'Offset Account'
    },
    {
      Id: 9,
      Name: 'Access to redraw'
    },
    {
      Id: 10,
      Name: 'Access to branch network'
    }
  ]
  ApplicationReason: any = [];
  isSubmitted = false;
  ApplicationId: string;
  SelectCheckbox: any[];
  constructor(private _formBuilder: FormBuilder,private _analysisService: AnalysisService,
     private route: ActivatedRoute, private _reasonForApplication: ReasonForApplicationService) {

  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.getMeta();
  }

  initGroup(list: any[]) {
    if (list != null) {
      let rows = this.ApplicantReasonForm.get('Status') as FormArray;
        list.forEach(i => {
          rows.push(this._formBuilder.group({
            Id: [i.SpecificLoanAndLenderFeaturesId],
            Name: [i.Name],
            Status: [i.SelectedTypeId.toString()],
            ReasonsForApplicationLinkId: [i.ReasonsForApplicationLinkId]
        }))
      })
    }else {
      let rows = this.ApplicantReasonForm.get('Status') as FormArray;
      this.ReasonRadioArray.forEach(i => {
        rows.push(this._formBuilder.group({
          Id: [i.Id],
          Name: [i.Name],
          Status: [null]
        }))
      })
    }

  }
  getMeta() {
    this._analysisService.getApplicationMeta().subscribe((res: any) => {
      this.ApplicationReason = res.body.ApplicationReason;
      if (this.ApplicationId != null) {
        this.GetReasonsForApplication();
      }
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
  onReasonSubmit(){
    if (this.ApplicantReasonForm.invalid) {
      return;
    }
    var arr: any = this.ApplicantReasonForm.value.Status;
    var list = arr.map(i => ({
        Id: i.Id,
        Name: i.Name,
        Status: +i.Status,
        ReasonsForApplicationLinkId: i.ReasonsForApplicationLinkId
    }));
    var obj = {
      ApplicationId: this.ApplicationId,
      Id: this.ApplicantReasonForm.value.ReasonForApplicationId,
      ReasonApplicationIds: this.ApplicantReasonForm.value.ApplicationReason.toString(),
      LoanDiscription: this.ApplicantReasonForm.value.Loan,
      SpecificLoanAndLenderFeatures: list
    }

    this._reasonForApplication.SaveReasonsForApplication(obj).subscribe((res: any) => {
      let rows = this.ApplicantReasonForm.get('Status') as FormArray;
      rows.clear();
      this.GetReasonsForApplication();
    })
    console.log(obj);
  }
  GetReasonsForApplication(){
    var obj = {
      ApplicationId: this.ApplicationId
    }
    this._reasonForApplication.GetReasonsForApplication(obj).subscribe((res: any) => {
      if (res.body.ReasonsForApplication_Radio != undefined && res.body.ReasonsForApplication_Radio.length > 0) {
        this.initGroup(res.body.ReasonsForApplication_Radio);
      }else {
        this.initGroup(null);
      }
      this.ApplicantReasonForm.patchValue({
        Loan: res.body.ReasonsForApplication.LoanDiscription,
        ReasonForApplicationId: res.body.ReasonsForApplication.Id
      });
      debugger
      this.SelectCheckbox = []
      if (res.body.ReasonsForApplication_Checkbox != undefined && res.body.ReasonsForApplication_Checkbox.length > 0) {
        this.ApplicationReason.forEach(i => {
          var idx = res.body.ReasonsForApplication_Checkbox.findIndex(j => j.ApplicationReasonId == i.ApplicationReasonId);
          if (idx > -1) {
            var obj = {
              IsChecked: true,
              ApplicationReasonId: res.body.ReasonsForApplication_Checkbox[idx].ApplicationReasonId,
              ApplicationReasonName: i.ApplicationReasonName
            }
            this.SelectCheckbox.push(obj);
          }else {
            var obj = {
              IsChecked: false,
              ApplicationReasonId: i.ApplicationReasonId,
              ApplicationReasonName: i.ApplicationReasonName
            }
            this.SelectCheckbox.push(obj);
          }
        })
      }
    })
  }
  selectChecbox(){
    console.log(this.SelectCheckbox)
  }
}
