import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {


  IsNext = false;
  applicantForm: FormGroup;
  applicantType = [
    {
      TypeId: 1,
      TypeName: 'Applicant'
    },
    {
      TypeId: 2,
      TypeName: 'Guarantor'
    },
    {
      TypeId: 3,
      TypeName: 'Non-applicant'
    },
  ]
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.applicantForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      SurName: ['', [Validators.required]],
      ApplicantType: new FormControl(1, [Validators.required])
    });
  }
  openApplicantDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '420px',
      width: '600px'
    });
  }
  onSubmit(){

  }
}
