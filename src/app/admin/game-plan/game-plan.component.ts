import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo', 'textColor', 'backgroundColor'],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private route: ActivatedRoute,
    private _adminService: AdminService,
    private _gamePlanService: GamePlanService,
    public _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
      this.GamePlanForm = this.rxFormBuilder.group({
        GamePlanId: [0],
        ApplicationId: new FormControl(this.ApplicationId),
        BrokerId: new FormControl('', [Validators.required]),
        PlanDate: ['', [Validators.required]],
        LenderId: new FormControl('', [Validators.required]),
        ClientName: ['', [Validators.required]],
        RefererId: new FormControl('', [Validators.required]),
        PrimaryPurposeTitleId: new FormControl('', [Validators.required]),
        PrimaryPurposeSubTitle: ['', [Validators.required]],
        ImmediateGoalsObjectivesTitleId: new FormControl('', [
          Validators.required,
        ]),
        ImmediateGoalsObjectivesSubTitle: ['', [Validators.required]],
        FutureFinancialGoalsTitleId: new FormControl('', [Validators.required]),
        FutureFinancialGoalsSubTitle: ['', [Validators.required]],
        OurRecommendationTitleId: ['', [Validators.required]],
        OurRecommendationSubTitle: ['', [Validators.required]],
        RatePreferenceId: ['', [Validators.required]],
        ImportanceId: ['', [Validators.required]],
        PaymentPreferenceId: ['', [Validators.required]],
        ReasonOfImportanceId: ['', [Validators.required]],
        SpecialFeaturesId: ['', [Validators.required]],
        RationaleForRecommendationTitleId: ['', [Validators.required]],
        RationaleForRecommendationSubTitle: ['', [Validators.required]],
        Importance2Id: ['', [Validators.required]],
        OtherInformationText: ['', [Validators.required]],
        ClientUnderstandingText: ['', [Validators.required]],
        BrokerInterviewedDate: ['', [Validators.required]],
        CurrentLenderId: ['', [Validators.required]],
        HappyWithCurrentLenderId: ['', [Validators.required]],
        PreferedLenderId: ['', [Validators.required]],
        ProductComparison1Id: ['', [Validators.required]],
        ProductComparison2Id: ['', [Validators.required]],
        ProductComparison3Id: ['', [Validators.required]],
        AppendixText:['As per myCRM and Fact Finder', [Validators.required]],
        MissingDocumentToRequestIds: ['', [Validators.required]],
        IsAddLenderRateLock: ['', [Validators.required]],
        ITBSMMessageText: ['', [Validators.required]],
        ClientsIdentifiedId: ['', [Validators.required]],
        DocumentDeliveryId: ['', [Validators.required]],
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
      this.GamPlanObj.GamePlanLookups.forEach((i) => {
        i.Guid = i.Id;
      });
      if (this.GamPlanObj.GamePlan == undefined) {
        this.GamePlanForm.patchValue({
          ClientName: this.GamPlanObj.Applicant.ClientName,
        });
      } else {
        this.PatchGamePlan();
      }
    });
  }
  PatchGamePlan() {
    this.GamePlanForm.patchValue({
      GamePlanId: this.GamPlanObj.GamePlan.GamePlanId,
      ClientName: this.GamPlanObj.GamePlan.ClientName,
      ApplicationId: this.GamPlanObj.GamePlan.ApplicationId,
      BrokerId: this.GamPlanObj.GamePlan.BrokerId,
      PlanDate: this.GamPlanObj.GamePlan.PlanDate,
      LenderId: this.GamPlanObj.GamePlan.LenderId,
      RefererId: this.GamPlanObj.GamePlan.RefererId,
      PrimaryPurposeTitleId: this.GamPlanObj.GamePlan.PrimaryPurposeTitleId,
      PrimaryPurposeSubTitle: this.GamPlanObj.GamePlan.PrimaryPurposeSubTitle,
      ImmediateGoalsObjectivesTitleId: this.GamPlanObj.GamePlan.ImmediateGoalsObjectivesTitleId,
      ImmediateGoalsObjectivesSubTitle: this.GamPlanObj.GamePlan.ImmediateGoalsObjectivesSubTitle,
      FutureFinancialGoalsTitleId: this.GamPlanObj.GamePlan.FutureFinancialGoalsTitleId,
      FutureFinancialGoalsSubTitle: this.GamPlanObj.GamePlan.FutureFinancialGoalsSubTitle,
      OurRecommendationTitleId: this.GamPlanObj.GamePlan.OurRecommendationTitleId,
      OurRecommendationSubTitle: this.GamPlanObj.GamePlan.OurRecommendationSubTitle,
      RatePreferenceId: this.GamPlanObj.GamePlan.RatePreferenceId,
      ImportanceId: this.GamPlanObj.GamePlan.ImportanceId,
      PaymentPreferenceId: this.GamPlanObj.GamePlan.PaymentPreferenceId,
      ReasonOfImportanceId: this.GamPlanObj.GamePlan.ReasonOfImportanceId,
      SpecialFeaturesId: this.GamPlanObj.GamePlan.SpecialFeaturesId,
      RationaleForRecommendationTitleId: this.GamPlanObj.GamePlan.RationaleForRecommendationTitleId,
      RationaleForRecommendationSubTitle: this.GamPlanObj.GamePlan.RationaleForRecommendationSubTitle,
      Importance2Id: this.GamPlanObj.GamePlan.Importance2Id,
      OtherInformationText: this.GamPlanObj.GamePlan.OtherInformationText,
      ClientUnderstandingText: this.GamPlanObj.GamePlan.ClientUnderstandingText,
      BrokerInterviewedDate: this.GamPlanObj.GamePlan.BrokerInterviewedDate,
      CurrentLenderId: this.GamPlanObj.GamePlan.CurrentLenderId,
      HappyWithCurrentLenderId: this.GamPlanObj.GamePlan.HappyWithCurrentLenderId,
      PreferedLenderId: this.GamPlanObj.GamePlan.PreferedLenderId,
      ProductComparison1Id: this.GamPlanObj.GamePlan.ProductComparison1Id,
      ProductComparison2Id: this.GamPlanObj.GamePlan.ProductComparison2Id,
      ProductComparison3Id: this.GamPlanObj.GamePlan.ProductComparison3Id,
      //AppendixText: this.GamPlanObj.GamePlan.AppendixText,
      MissingDocumentToRequestIds: this.GamPlanObj.GamePlan.MissingDocumentToRequestIds.split(',').map(str => parseInt(str)),
      IsAddLenderRateLock: this.GamPlanObj.GamePlan.IsAddLenderRateLock == true ? '1' : '0',
      ITBSMMessageText: this.GamPlanObj.GamePlan.ITBSMMessageText,
      ClientsIdentifiedId: this.GamPlanObj.GamePlan.ClientsIdentifiedId,
      DocumentDeliveryId: this.GamPlanObj.GamePlan.DocumentDeliveryId,
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

  SaveGamePlanLookup(newValue: string, TypeId, TypeName): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }

    if (this.checkIfExists(newValue, TypeName)) {
      return;
    }
    const obj = {
      Id: -1,
      Name: newValue,
      TypeId: TypeId,
      TypeName: TypeName,
    };
    this._gamePlanService.SaveGamePlanLookup(obj).subscribe({
      next: (response) => {
        debugger
        obj.Id = response.body;
        this.GamPlanObj.GamePlanLookups.push(obj);
      },
      error: (error) => {},
    });
  }

  checkIfExists(newValue: string, TypeName: string): boolean {
    const exists = this.GamPlanObj.GamePlanLookups.find(
      (item) => item.Name == newValue && item.TypeName == TypeName
    );

    if (exists) {
      return true;
    }
    return false;
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
    var idx = this.GamPlanObj.GamePlanLookups.findIndex((x) => x.Guid == Guid);
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

    var gamePlanLookup = this.GamPlanObj.GamePlanLookups.filter(
      (x) => x.Id == -1
    );
    for (let item of gamePlanLookup) {
      item.Id = null;
    }
    var gamePlan = {
      GamePlanId: this.GamePlanForm.value.GamePlanId,
      ApplicationId: this.GamePlanForm.value.ApplicationId,
      BrokerId: this.GamePlanForm.value.BrokerId,
      PlanDate: this.GamePlanForm.value.PlanDate,
      LenderId: this.GamePlanForm.value.LenderId,
      ClientName: this.GamePlanForm.value.ClientName,
      RefererId: this.GamePlanForm.value.RefererId,
      PrimaryPurposeTitleId: this.GamePlanForm.value.PrimaryPurposeTitleId,
      PrimaryPurposeSubTitle: this.GamePlanForm.value.PrimaryPurposeSubTitle,
      ImmediateGoalsObjectivesTitleId: this.GamePlanForm.value.ImmediateGoalsObjectivesTitleId,
      ImmediateGoalsObjectivesSubTitle: this.GamePlanForm.value.ImmediateGoalsObjectivesSubTitle,
      FutureFinancialGoalsTitleId: this.GamePlanForm.value.FutureFinancialGoalsTitleId,
      FutureFinancialGoalsSubTitle: this.GamePlanForm.value.FutureFinancialGoalsSubTitle,
      OurRecommendationTitleId: this.GamePlanForm.value.OurRecommendationTitleId,
      OurRecommendationSubTitle: this.GamePlanForm.value.OurRecommendationSubTitle,
      RatePreferenceId: this.GamePlanForm.value.RatePreferenceId,
      ImportanceId: this.GamePlanForm.value.ImportanceId,
      PaymentPreferenceId: this.GamePlanForm.value.PaymentPreferenceId,
      ReasonOfImportanceId: this.GamePlanForm.value.ReasonOfImportanceId,
      SpecialFeaturesId: this.GamePlanForm.value.SpecialFeaturesId,
      RationaleForRecommendationTitleId: this.GamePlanForm.value.RationaleForRecommendationTitleId,
      RationaleForRecommendationSubTitle: this.GamePlanForm.value.RationaleForRecommendationSubTitle,
      Importance2Id: this.GamePlanForm.value.Importance2Id,
      OtherInformationText: this.GamePlanForm.value.OtherInformationText,
      ClientUnderstandingText: this.GamePlanForm.value.ClientUnderstandingText,
      BrokerInterviewedDate: this.GamePlanForm.value.BrokerInterviewedDate,
      CurrentLenderId: this.GamePlanForm.value.CurrentLenderId,
      HappyWithCurrentLenderId: this.GamePlanForm.value.HappyWithCurrentLenderId,
      PreferedLenderId: this.GamePlanForm.value.PreferedLenderId,
      ProductComparison1Id: this.GamePlanForm.value.ProductComparison1Id,
      ProductComparison2Id: this.GamePlanForm.value.ProductComparison2Id,
      ProductComparison3Id: this.GamePlanForm.value.ProductComparison3Id,
      //AppendixText: this.GamePlanForm.value.AppendixText,
      MissingDocumentToRequestIds: this.GamePlanForm.value.MissingDocumentToRequestIds,
      IsAddLenderRateLock: this.GamePlanForm.value.IsAddLenderRateLock,
      ITBSMMessageText: this.GamePlanForm.value.ITBSMMessageText,
      ClientsIdentifiedId: this.GamePlanForm.value.ClientsIdentifiedId,
      DocumentDeliveryId: this.GamePlanForm.value.DocumentDeliveryId,
    };
    var obj = {
      GamePlan: gamePlan,
    };

    this._gamePlanService.SaveGamePlan(obj).subscribe({
      next: (response) => {},
      error: (error) => {},
    });
  }
  setInformationBrokerMessage(event) {
    debugger
    var idx = this.GamPlanObj.GamePlanLookups.findIndex(x => x.Id == event);
    if (idx > -1) {
      var name = this.GamPlanObj.GamePlanLookups[idx].Name;
      this.GamePlanForm.patchValue({
        ITBSMMessageText: 'Please prepare and send Discharge form for ' + name + ' both applicants to sign (signing page to be added to all signing pages)',
        AppendixText:['As per myCRM and Fact Finder', [Validators.required]],
      });
    }
  }
}
