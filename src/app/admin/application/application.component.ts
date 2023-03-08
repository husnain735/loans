import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  applications: any[] = [];
  displayedColumns = ['EmailAddress','CreatedDate','Actions'];

  constructor(private _adminService: AdminService,
    private router: Router, public dialog: MatDialog) {
  }
  ngOnInit() {

    this.GetApplications();

  }
  GetApplications() {
    this._adminService.GetApplications().subscribe((res: any) => {
      this.applications = res.body
    });
  }
  onEdit(ApplicationId) {
    localStorage.setItem('ApplicationId',ApplicationId);
    this.router.navigate(['client/' + ApplicationId + '/applicant']);
  }
  DeleteApplication(ApplicationId){
    var obj = {
      ApplicationId: ApplicationId
    }
    this._adminService.DeleteApplication(obj).subscribe((res: any) => {
      this.GetApplications();
    });
  }
}
