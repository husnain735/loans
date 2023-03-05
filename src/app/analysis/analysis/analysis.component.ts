import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  sideNavMenu: any = [
    {
      Title: 'Applicants',
      Route: 'applicant',
      IsActive: true
    },
    {
      Title: 'Assets',
      Route: 'assets',
      IsActive: true
    },
    {
      Title: 'Liabilities',
      Route: 'liabilities',
      IsActive: true
    },
    {
      Title: 'Reason for Application',
      Route: 'reason-application',
      IsActive: true
    },
    {
      Title: 'Relative',
      Route: 'relative',
      IsActive: true
    },
    {
      Title: 'Risk / Insurance profile',
      Route: 'risk-insurance-profile',
      IsActive: true
    },
    {
      Title: 'Retirement Plans',
      Route: 'retirement-plans',
      IsActive: true
    },
    {
      Title: 'Financial Goals',
      Route: 'financial-goals',
      IsActive: true
    },
    {
      Title: 'Expenses',
      Route: 'expenses',
      IsActive: true
    },
    {
      Title: 'Review',
      Route: 'review',
      IsActive: true
    },
  ]
  @ViewChild("sidenav", { static: true }) public sidenav: any;

  applicationguid: string;
  ApplicationReason: any = [];
  ApplicationList: any = [];


  constructor(public router: Router, private route: ActivatedRoute, private _analysisService: AnalysisService, public _sharedService: SharedService) {
    // this._analysisService.getAllAppicants.subscribe(
    //   (data) => {
    //     this.getAllApplicants();
    //   }
    // );
  }
  ngOnInit() {

    console.log(this.router.url);
    this.sidenav.toggle(true);
    this.getMeta();

    this.route.params.subscribe((params: any) => {
      this.applicationguid = params['guid'];
      console.log('analysis', this.applicationguid);
    });
    this.getAllApplicants();
  }

  getMeta() {
    this._analysisService.getApplicationMeta().subscribe((res: any) => {
      this.ApplicationReason = res.body.ApplicationReason;
    })
  }

  getAllApplicants() {
    this.applicationguid = localStorage.getItem('ApplicationId');
    // if(this.applicationguid == undefined){
    //   this.applicationguid = 'c6858457-a335-4fdc-b92a-78569d936c91';
    // }
    this._analysisService.getAllApplicants(this.applicationguid).subscribe(res => {
      this._sharedService.TotalApplicants = res.body;
    })
  }

  onNavigateToApplicant(applicant: any) {
    this.router.navigate(['client/' + applicant.ApplicationId + '/applicant/' + applicant.ApplicantId]);
  }

}
