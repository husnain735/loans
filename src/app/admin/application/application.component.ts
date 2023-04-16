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
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver/dist/FileSaver';

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
  relativesObj: any[] = [];
  financialGoals: any[] = [];
  riskInsuarance: any[] = [];
  applicationReason: any[] = [];
  retirementPlans: any;
  retirementPlansTable: any[];
  livingExpenses: any[];
  AssetsIncome: number;
  FamilyExpenses: number;
  LivingExpenses: number;
  OtherIncome: any[];
  Property: any[];
  Savings: any[];
  Superannuation: any[];
  MotorVehicle: any[];
  MoreAssets: any[];
  MonthlyIncome: any;
  TotalMonthlyIncome: number;
  ApplicationId: number;
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  baseApiUrl = environment.ResourceServer.BaseApiUrl;
  constructor(
    private _adminService: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
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
    this.ApplicationId = ApplicationId;
    var obj = {
      ApplicationId: ApplicationId,
    };
    await this._adminService.PrintPDF(obj).subscribe((res: any) => {
      this.relativesObj = [];
      this.financialGoals = [];
      this.riskInsuarance = [];
      this.Applicants = res.body.pdfViewModel.Applicants;
      this.ApplicantsDetails = res.body.pdfViewModel.ApplicantDetails;
      this.ApplicantAddress = res.body.pdfViewModel.ApplicantDetailAddresses;
      this.ApplicantContactInformations =
        res.body.pdfViewModel.ApplicantContactInformations;
      this.ApplicantEmployeeDetails =
        res.body.pdfViewModel.ApplicantEmployeeDetails;
      this.ApplicantOtherIncomes = res.body.pdfViewModel.ApplicantOtherIncomes;
      this.Liabilities = res.body.GetLiabilities.Liabilities;
      this.liabilities_Applicants_Links =
        res.body.GetLiabilities.liabilities_Applicants_Links;

      this.relativesObj.push(res.body.relativeObj);
      this.financialGoals.push(res.body.financialGoalsObj);
      this.riskInsuarance.push(res.body.riskInsuranceProfile);
      this.applicationReason =
        res.body.getReasonsForApplication.ReasonsForApplication_Radio;
      this.retirementPlans = res.body.getRetirementPlans.RetirementPlans;
      this.retirementPlansTable =
        res.body.getRetirementPlans.RetirementPlans_Checboxes;
      this.livingExpenses = res.body.getLivingExpenses.LivingExpenses;
      this.AssetsIncome = res.body.AssetsIncome;
      this.FamilyExpenses = res.body.FamilyExpenses;
      this.LivingExpenses = res.body.LivingExpenses;
      this.OtherIncome = res.body.OtherIncome;
      this.Property = res.body.assets.AssetsDetails;
      this.Savings = res.body.assets.Savings;
      this.Superannuation = res.body.assets.Superannuation;
      this.MotorVehicle = res.body.assets.MotorVehicle;
      this.MoreAssets = res.body.assets.MoreAssets;
      console.log(this.Property);
      this.MonthlyIncome = res.body.MonthlyIncome;
      this.TotalMonthlyIncome = res.body.TotalMonthlyIncome;

      this.FamilyExpenses = this.FamilyExpenses + this.TotalMonthlyIncome;
    });
    setTimeout(() => {
      this.print();
    }, 5000);
  }
  print() {
    const pdfTable = JSON.stringify(
      document.body.querySelector('.pdfTable').outerHTML
    );
    var obj: any = {
      elementHtml: pdfTable,
      ApplicationId: this.ApplicationId,
    };

    this._adminService.GeneratePhaseOnePdf(obj).subscribe((res) => {
      debugger;
      console.log(this.baseApiUrl + '/' + res.body);
      var url = this.baseApiUrl + '/' + res.body;
      this.downloadPdf(url);
    });
  }
  downloadPdf(url) {
    // this.http.get(url, { responseType: "arraybuffer" }).subscribe(
    //   pdf => {
    //     const blob = new Blob([pdf], { type: "application/pdf" });
    //     const fileName = "finance.pdf";
    //     saveAs(blob, fileName);
    //   },
    //   err => {
    //     console.log("err->", err);
    //   }
    // );
    window.open(url, '_blank');
  }
  gotoGamePlan(ApplicationId) {
    this.router.navigate(['admin/' + ApplicationId + '/game-plan']);
  }
}
