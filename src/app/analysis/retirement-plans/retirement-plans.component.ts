import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RetirmentPlansService } from 'src/app/shared/services/retirmentPlans.service';

@Component({
  selector: 'app-retirement-plans',
  templateUrl: './retirement-plans.component.html',
  styleUrls: ['./retirement-plans.component.scss']
})
export class RetirementPlansComponent implements OnInit {

  SelectCheckbox: any[] = [];
  RetirementPlans = this._formBuilder.group({
    RetirementPlanId: null,
    RetirementAge: ['', [Validators.required]],
    Checkboxs: this._formBuilder.array([])
  });
  RetirementPlansCheckbox = [
    {
      Id: 1,
      Name:'Repayment of loan prior to retirement',
      IsChecked: false,
    },
    {
      Id: 2,
      Name:'Downsizing home',
      IsChecked: false,
    },
    {
      Id: 3,
      Name:'Sale of assets (e.g. investment property or shares)',
      IsChecked: false,
    },
    {
      Id: 4,
      Name:'Ongoing income from your superannuation',
      IsChecked: false,
    },
    {
      Id: 5,
      Name:'Superannuation lump sum following retirement',
      IsChecked: false,
    },
    {
      Id: 6,
      Name:'Income from other investments (e.g. shares, rental income)',
      IsChecked: false,
    },
    {
      Id: 7,
      Name:'Co-applicants income',
      IsChecked: false,
    },
    {
      Id: 8,
      Name:'Reducing loan term',
      IsChecked: false,
    }
  ]
  ApplicationId: string;
  RetirementAge = [
    20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ];
  constructor(private _formBuilder: FormBuilder, private _retirmentPlans :  RetirmentPlansService,
    private route: ActivatedRoute, protected router:Router) {

  }
  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.GetRetirementPlansApi();
  }

  GetRetirementPlans() {
    return this.RetirementPlans.get('Checkboxs') as FormArray;
  }
  onRetirementPlanSubmit(){
    if (this.RetirementPlans.invalid) {
      return;
    }

    this.GetRetirementPlans().clear();
    var interests = this.GetRetirementPlans();
    this.RetirementPlansCheckbox
    this.RetirementPlansCheckbox.forEach(i => {
      if (i.IsChecked) {
        interests.push(new FormControl(i.Id));
      }
    })
    var obj = {
      Id: this.RetirementPlans.value.RetirementPlanId,
      RetirementAge: +this.RetirementPlans.value.RetirementAge,
      CheckboxIds: this.RetirementPlans.value.Checkboxs.length > 0 ? this.RetirementPlans.value.Checkboxs.toString() : null,
      ApplicationId: this.ApplicationId
    }
    this._retirmentPlans.SaveRetirementPlans(obj).subscribe((res: any) => {
      this.GetRetirementPlansApi();
      this.router.navigate(['client/' + this.ApplicationId + '/financial-goals']);

    });
  }

  GetRetirementPlansApi(){
    var obj = {
      ApplicationId: this.ApplicationId
    }
    this._retirmentPlans.GetRetirementPlans(obj).subscribe((res: any) => {
      if (res.body.RetirementPlans != undefined) {
        this.RetirementPlans.patchValue({
          RetirementPlanId: res.body.RetirementPlans.Id,
          RetirementAge: res.body.RetirementPlans.RetirementAge
        });
      }
      if (res.body.RetirementPlans_Checboxes != undefined && res.body.RetirementPlans_Checboxes.length > 0) {
        this.RetirementPlansCheckbox.forEach(i => {
          var idx = res.body.RetirementPlans_Checboxes.findIndex(j => j.RetirementPlanCheckboxId == i.Id);
          if (idx > -1) {
            i.IsChecked = true;
          }
        })
      }
    });
  }
}
