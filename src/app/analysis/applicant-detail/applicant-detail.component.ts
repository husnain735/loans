import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  ApplicantDetailForm = this._formBuilder.group({
    ApplicantType: ['1', [Validators.required]],
    SalutationTypeId: ['', [Validators.required]],
    FirstName: ['', [Validators.required]],
    SurName: ['', [Validators.required]],
    MiddleName: ['', [Validators.required]],
    DateOfBirth: ['', [Validators.required]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;
  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit() {

  }

}
