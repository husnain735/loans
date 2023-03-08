import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit  {

  @ViewChild("sidenav", { static: true }) public sidenav: any;
  password: string;
  userId: string;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  key = environment.AdminKey;
  IsTrue = false;
  error = false;
  IsAdmin: string;

  constructor(private _adminService: AdminService,
    public router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.IsAdmin = localStorage.getItem('IsAdmin');
    if (this.IsAdmin == 'true') {
      this.IsTrue = true;
    }else{
      this.openApplicantDailog(this.content);
    }
    if (this.IsTrue) {
      this.sidenav.toggle(true);
    }
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
}
