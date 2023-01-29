import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {


  IsNext = false;
  isSubmitted: boolean = false;
  applicantForm: FormGroup;
  applicantType = [
    {
      TypeId: 1,
      TypeName: 'Applicant'
    },
    {
      TypeId: 2,
      TypeName: 'Guarantor'
    },
    {
      TypeId: 3,
      TypeName: 'Non-applicant'
    },
  ]
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private _analysisSerivce: AnalysisService,
    private route: ActivatedRoute,
    private router: Router,public _sharedService: SharedService) {

  }
  ngOnInit() {
    this.applicantForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      SurName: ['', [Validators.required]],
      ApplicantType: new FormControl(1, [Validators.required])
    });
  }
  openApplicantDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '420px',
      width: '600px'
    });
  }
  applicant: any = {};
  applicationguid: string;
  Applicantguid: string;
  onSubmit() {

    this.isSubmitted = true;
    if (this.applicantForm.invalid) {
      return;
    }
    else {
      this.route.params.subscribe((params: any) => {
        this.applicationguid = params['guid'];
      });
      console.log(this.applicantForm.value);
      this.applicant.FirstName = this.applicantForm.value.FirstName;
      this.applicant.SurName = this.applicantForm.value.SurName;
      this.applicant.ApplicantTypeId = this.applicantForm.value.ApplicantType;
      this.applicant.ApplicationId = this.applicationguid;
      this._analysisSerivce.saveApplicant(this.applicant).subscribe(res => {
        console.log(res);
        this.Applicantguid = res.body;
        this.applicant.ApplicantId = this.Applicantguid;
        this._sharedService.TotalApplicants.push(this.applicant);
        this.applicant ={};
        this.router.navigate(['client/' + this.applicationguid + '/applicant/' + this.Applicantguid]);
        this.dialog.closeAll();
      })
    }
  }
  onNavigateToApplicant(applicant:any){
    this.router.navigate(['client/' + applicant.ApplicationId + '/applicant/' + applicant.ApplicantId]);
  }
}
