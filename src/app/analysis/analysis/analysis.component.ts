import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  sideNavMenu : any = [
    {
      Title: 'Applicants',
      Route: 'applicants',
      IsActive: true
    },
    {
      Title: 'Assets',
      Route: 'asets',
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

  constructor(private router: Router) {
  }
  ngOnInit() {
    console.log(this.router.url.includes('applicants'));
    this.sidenav.toggle(true)
  }




}
