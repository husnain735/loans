import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { atLeastOneCheckboxCheckedValidator } from 'src/app/shared/formValidation/atLeastOneCheckboxCheckedValidator';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
//import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent {
  userAddressValidations: FormGroup;
  toppings = this.formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  selectedCountry: string = 'GB';
  LoanBroker:any=[];
  ApplicationReason:any=[];

  selectedCountryControl = new FormControl(this.selectedCountry);

  isSubmitted = false;
  guid: string;
  routeName: string;
  sub: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _analysisService: AnalysisService
  ) {}
  get f() {
    return this.userAddressValidations && this.userAddressValidations.controls;
  }
  get reasonsFormArr(): FormArray {
    return this.f && <FormArray>this.f['reasonsFormArr'];
  }
  ngOnInit() {
    this.getMeta();
    if (this.router.url != '/') {
      var url = this.router.url;
      this.guid = url;
    }
    this.userAddressValidations = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      LoansBroker: new FormControl('', [Validators.required]),
    });
  }
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete =
      this.LoanBroker != null && this.LoanBroker.every((t) => t.completed);
  }
  buildReasonsFormArr(
    categories: any,
    selectedCategoryIds: string[] = []
  ): FormArray {
    debugger
    const controlArr = categories.map((category) => {
      let isSelected = selectedCategoryIds.some((id) => id === category.ApplicationReasonId);
      return this.formBuilder.control(isSelected);
    });
    return this.formBuilder.array(
      controlArr,
      atLeastOneCheckboxCheckedValidator()
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.userAddressValidations.invalid) {
      return;
    }
    this.userAddressValidations.value.reasonsFormArr.
    this.guid = 'd964886a-c7e5-4c61-8535-5c3f28a6fb89';
    this.router.navigate(['client/' + this.guid + '/applicant']);
    console.log(this.userAddressValidations.value);
  }
  getMeta(){
    this._analysisService.getApplicationMeta().subscribe((res:any) =>{
      this.ApplicationReason = res.body.ApplicationReason;
      this.LoanBroker = res.body.LoansBroker;
      console.log(this.ApplicationReason)
      console.log(this.LoanBroker);
      this.userAddressValidations.addControl(
        'reasonsFormArr',
        this.buildReasonsFormArr(this.ApplicationReason)
      );
    })
  }

}
