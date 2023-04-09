import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-game-plan',
  templateUrl: './game-plan.component.html',
  styleUrls: ['./game-plan.component.scss'],
})
export class GamePlanComponent implements OnInit {
  ApplicationId: string;
  GamePlanForm: FormGroup;
  GamPlanObj: any;
  foods = [
    { value: 1, viewValue: 'Group 1' },
    { value: 2, viewValue: 'Group 2' },
    { value: 3, viewValue: 'Group 3' },
    { value: 4, viewValue: 'Group 4' },
  ];
  constructor(
    private rxFormBuilder: RxFormBuilder,
    private route: ActivatedRoute,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.GamePlanForm = this.rxFormBuilder.group({
      BrokerId: new FormControl('', [Validators.required]),
      PlanDate: ['', [Validators.required]],
      LenderId: new FormControl('', [Validators.required]),
      ClientName: ['', [Validators.required]],
      RefererId: new FormControl('', [Validators.required]),
      PrimaryPurposeTitleId: new FormControl('', [Validators.required]),
      PrimaryPurposeSubTitle: ['', [Validators.required]],
    });
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.GamPlanObj = new Object();
    this.GetGamePlanMetadata();
  }
  GetGamePlanMetadata() {
    var obj = {
      ApplicationId: this.ApplicationId,
    };
    this._adminService.GetGamePlanMetadata(obj).subscribe((res: any) => {
      this.GamPlanObj = res.body;
      this.GamePlanForm.patchValue({
        ClientName: this.GamPlanObj.Applicant.ClientName,
      });
    });
  }

  add(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.foods.push({ value: -1, viewValue: newValue });
  }
  onGamePlanSubmit() {
    if (this.GamePlanForm.invalid) {
      return;
    }
    console.log(this.GamePlanForm.value);
  }
  addLoansBroker(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.GamPlanObj.LoansBrokers.push({
      LoansBrokerId: -1,
      Name: newValue,
    });
  }
  addLender(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.GamPlanObj.Lenders.push({
      LenderId: -1,
      LenderName: newValue,
    });
  }
  addReferer(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.GamPlanObj.Referers.push({
      RefererId: -1,
      RefererName: newValue,
    });
  }
  addPrimaryPurpose(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.GamPlanObj.PrimaryPurposes.push({
      PrimaryPurposeId: -1,
      PrimaryPurposeName: newValue,
    });
  }

  handleInput(event) {
    var previousLength = 0;
    const bullet = '\u2022';
    const newLength = event.target.value.length;
    const characterCode = event.target.value.substr(-1).charCodeAt(0);

    if (newLength > previousLength) {
      if (characterCode === 10) {
        event.target.value = `${event.target.value}${bullet} `;
      } else if (newLength === 1) {
        event.target.value = `${bullet} ${event.target.value}`;
      }
    }
    previousLength = newLength;
  }
}
