import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-loans-broker',
  templateUrl: './loans-broker.component.html',
  styleUrls: ['./loans-broker.component.scss']
})
export class LoansBrokerComponent {
  loansBrokers: any[] = [];
  displayedColumns = ['Name','Email','CreatedDate','Actions'];
  loansBrokerForm: FormGroup;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;

  constructor(private _adminService: AdminService,
    private router: Router, public dialog: MatDialog,
    private formBuilder: FormBuilder,
    protected _analysisService: AnalysisService) {
  }
  ngOnInit() {
    this.addLoansBrokerForm();
    this.getAllLoansBroker();
  }

  addLoansBrokerForm(){
    this.loansBrokerForm = this.formBuilder.group({
      LoansBrokerId: null,
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.email]],
    });
  }

  openLoansBrokerDailog(content): void {
    this.loansBrokerForm.reset();
    const dialogRef = this.dialog.open(content, {
      height: '350px',
      width: '600px'
    });
  }
  onSubmit(){
    this._analysisService.SaveLoansBroker(this.loansBrokerForm.value).subscribe(res =>{
      console.log(res);
      this.getAllLoansBroker();
      this.dialog.closeAll();
    })
  }


  getAllLoansBroker(){
    this._analysisService.getAllLoansBroker().subscribe(res =>{
      console.log(res);
      this.loansBrokers = res.body.LoansBroker;
    })
  }

  onEdit(item:any){
    debugger
    this.loansBrokerForm = this.formBuilder.group({
      LoansBrokerId: [item.LoansBrokerId],
      Name: [item.Name, [Validators.required]],
      Email: [item.Email  , [Validators.required,Validators.email]],
    });
    const dialogRef = this.dialog.open(this.content, {
      height: '350px',
      width: '600px'
    });
  }

}
