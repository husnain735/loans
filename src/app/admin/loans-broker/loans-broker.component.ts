import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-loans-broker',
  templateUrl: './loans-broker.component.html',
  styleUrls: ['./loans-broker.component.scss']
})
export class LoansBrokerComponent {
  loansBrokers: any[] = [];
  displayedColumns = ['Name','Email','CreatedDate','Actions'];
  loansBrokerForm: FormGroup;
  constructor(private _adminService: AdminService,
    private router: Router, public dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.loansBrokerForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.email]],
    });
  }
  openLoansBrokerDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '350px',
      width: '600px'
    });
  }
  onSubmit(){

  }
}
