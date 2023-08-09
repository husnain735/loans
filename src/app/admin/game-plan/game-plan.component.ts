import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AdminService } from 'src/app/shared/services/admin.service';
import { GamePlanService } from 'src/app/shared/services/gameplan.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    private _adminService: AdminService,
    private _gamePlanService: GamePlanService,
    public _sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
      this.GamePlanForm = this.rxFormBuilder.group({
        ApplicationId: new FormControl(this.ApplicationId),
        BrokerId: new FormControl('', [Validators.required]),
        PlanDate: ['', [Validators.required]],
        LenderId: new FormControl('', [Validators.required]),
        ClientName: ['', [Validators.required]],
        RefererId: new FormControl('', [Validators.required])
        // PrimaryPurposeTitleId: new FormControl('', [Validators.required]),
        // PrimaryPurposeSubTitle: ['', [Validators.required]],
        // ImmediateGoalsObjectivesTitleId: new FormControl('', [Validators.required]),
        // ImmediateGoalsObjectivesSubTitle: ['', [Validators.required]],
        // FutureFinancialGoalsTitleId: new FormControl('', [Validators.required]),
        // FutureFinancialGoalsSubTitle: ['', [Validators.required]],
      });
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
      this.GamPlanObj.GamePlanLookups.forEach(i => {
        i.Guid = i.Id
      });
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
  addEntry(newValue: string, TypeId, TypeName): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }

    this.GamPlanObj.GamePlanLookups.push({
      Id: -1,
      Name: newValue,
      TypeId: TypeId,
      TypeName: TypeName,
      Guid: this._sharedService.generateGUID()
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

  test(event: any) {
    console.log(event.source.triggerValue);
  }
  removeEntry(Guid) {
    var idx = this.GamPlanObj.GamePlanLookups.findIndex(x => x.Guid == Guid);
    if (idx > -1) {
      this.GamPlanObj.GamePlanLookups.splice(idx, 1);
    }
  }
  removeLoansBroker(index) {
    this.GamPlanObj.LoansBrokers.splice(index, 1);
  }
  SaveGamePlan() {
    if (this.GamePlanForm.invalid) {
      return;
    }

    var gamePlanLookup = this.GamPlanObj.GamePlanLookups.filter(x => x.Id == -1);
    var gamePlan = {
      ApplicationId: this.GamePlanForm.value.ApplicationId,
      BrokerId: this.GamePlanForm.value.BrokerId,
      PlanDate: this.GamePlanForm.value.PlanDate,
      LenderId: this.GamePlanForm.value.LenderId,
      ClientName: this.GamePlanForm.value.ClientName,
      RefererId: this.GamePlanForm.value.RefererId
    }
    var obj = {
      GamePlan: gamePlan,
      GamePlanLookup: gamePlanLookup
    }
    this._gamePlanService.SaveGamePlan(obj).subscribe({
      next: (response) => {

      },
      error: (error) => {

      }
    })
  }
  
}
