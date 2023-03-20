import {
  Component,
  ElementRef,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {
  applications: any[] = [];
  displayedColumns = ['EmailAddress', 'CreatedDate', 'Actions'];
  Applicants: any[] = [];
  ApplicantsDetails: any[] = [];
  ApplicantAddress: any[] = [];
  ApplicantContactInformations: any[] = [];
  ApplicantEmployeeDetails: any[] = [];
  ApplicantOtherIncomes: any[] = [];
  Liabilities: any[] = [];
  liabilities_Applicants_Links: any[] = [];
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  constructor(
    private _adminService: AdminService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetApplications();
  }
  GetApplications() {
    this._adminService.GetApplications().subscribe((res: any) => {
      this.applications = res.body;
    });
  }
  onEdit(ApplicationId) {
    localStorage.setItem('ApplicationId', ApplicationId);
    this.router.navigate(['client/' + ApplicationId + '/applicant']);
  }
  DeleteApplication(ApplicationId) {
    var obj = {
      ApplicationId: ApplicationId,
    };
    this._adminService.DeleteApplication(obj).subscribe((res: any) => {
      this.GetApplications();
    });
  }
  async PrintPDF(ApplicationId) {
    var obj = {
      ApplicationId: ApplicationId,
    };
    await this._adminService.PrintPDF(obj).subscribe((res: any) => {
      this.Applicants = res.body.pdfViewModel.Applicants;
      this.ApplicantsDetails = res.body.pdfViewModel.ApplicantDetails;
      this.ApplicantAddress = res.body.pdfViewModel.ApplicantDetailAddresses;
      this.ApplicantContactInformations = res.body.pdfViewModel.ApplicantContactInformations;
      this.ApplicantEmployeeDetails = res.body.pdfViewModel.ApplicantEmployeeDetails;
      this.ApplicantOtherIncomes = res.body.pdfViewModel.ApplicantOtherIncomes;
      this.Liabilities = res.body.GetLiabilities.Liabilities;
      this.liabilities_Applicants_Links = res.body.GetLiabilities.liabilities_Applicants_Links;
    });
    setTimeout(() => {
      this.print();
    }, 1000);

  }
  print() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }
}
