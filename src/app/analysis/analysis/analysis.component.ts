import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

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
  ApplicationList:any = [];


  constructor(private router: Router, private route: ActivatedRoute,private _analysisService: AnalysisService) {
    this._analysisService.getAllAppicants.subscribe(
      (data) => {
        this.getAllApplicants();
      }
    );
  }
  ngOnInit() {
    console.log(this.router.url);
    this.sidenav.toggle(true);
    this.getMeta();

    this.route.params.subscribe((params: any) => {
      this.applicationguid = params['guid'];
      console.log('analysis',this.applicationguid);
    });
      // var applicationID = this.router.url;
      // applicationID = applicationID.replace('/client/','')
      // applicationID = applicationID.replace('/applicant','')
      // this.applicationguid = applicationID;
      //if(this.applicationguid != undefined){
        this.getAllApplicants();
      // }
  }

  getMeta() {
    this._analysisService.getApplicationMeta().subscribe((res: any) => {
      this.ApplicationReason = res.body.ApplicationReason;
      // this.LoanBroker = res.body.LoansBroker;
    })
  }

  getAllApplicants(){
    this.applicationguid = localStorage.getItem('ApplicationId');
    this._analysisService.getAllApplicants(this.applicationguid).subscribe(res =>{
      this.ApplicationList = res.body;
      console.log(this.ApplicationList);

    })
  }

  onNavigateToApplicant(applicant:any){
    this.router.navigate(['client/' + applicant.ApplicationId + '/applicant/' + applicant.ApplicantId]);
  }

}
