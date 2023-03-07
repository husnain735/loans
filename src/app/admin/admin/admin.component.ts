import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  applications: any[] = [];
  displayedColumns = ['EmailAddress','CreatedDate','Actions'];
  password: string;
  userId: string;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  key = environment.AdminKey;
  IsTrue = false;
  error = false;
  IsAdmin: string;
  constructor(private _adminService: AdminService,
    private router: Router, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.IsAdmin = localStorage.getItem('IsAdmin');
    if (this.IsAdmin == 'true') {
      this.IsTrue = true;
    }else{
      this.openApplicantDailog(this.content);
    }
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
  openApplicantDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '320px',
      width: '500px',
      disableClose: true
    });
  }
  checkPassword(){
    if (this.userId == this.key.UserId && this.password == this.key.Password) {
      this.dialog.closeAll();
      this.IsTrue = true;
      localStorage.setItem('IsAdmin','true');
    }else{
      this.error = true;
    }
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
