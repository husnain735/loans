import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { atLeastOneCheckboxCheckedValidator } from 'src/app/shared/formValidation/atLeastOneCheckboxCheckedValidator';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {
  userAddressValidations: FormGroup;
  subtasks = [
    {name: 'Primary', completed: false, color: 'primary'},
    {name: 'Accent', completed: false, color: 'accent'},
    {name: 'Warn', completed: false, color: 'warn'},
  ];
  toppings = this.formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  countries: any = [
    {
      id: '1',
      title: "Great Britain"
    },
    {
      id: '2',
      title: "United States",
    },
    {
      id: '3',
      title: "Canada",
    }
  ];
  selectedCountry: string = "GB";

  selectedCountryControl = new FormControl(this.selectedCountry);

  isSubmitted = false;
  guid: string;
  routeName: string;
  sub: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) { }
  get f() {
    return this.userAddressValidations && this.userAddressValidations.controls;
  }
  get reasonsFormArr(): FormArray {
    return this.f && <FormArray>this.f['reasonsFormArr'];
  }
  ngOnInit() {
    if (this.router.url != '/') {
      var url = this.router.url;
      this.guid = url;
    }
    this.userAddressValidations = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      LoansBroker: new FormControl('', [Validators.required])
    });

    this.userAddressValidations.addControl("reasonsFormArr", this.buildReasonsFormArr(this.countries));
  }
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.subtasks != null && this.subtasks.every(t => t.completed);
  }
  buildReasonsFormArr(categories: any, selectedCategoryIds: string[] = []): FormArray {
    const controlArr = categories.map(category => {
      let isSelected = selectedCategoryIds.some(id => id === category.id);
      return this.formBuilder.control(isSelected);
    })
    return this.formBuilder.array(controlArr, atLeastOneCheckboxCheckedValidator())
  }
  onSubmit(){
    this.isSubmitted = true;
    if (this.userAddressValidations.invalid) {
      return;
    }
    this.guid = 'd964886a-c7e5-4c61-8535-5c3f28a6fb89';
    this.router.navigate(['client/' + this.guid + '/applicant']);
    console.log(this.userAddressValidations.value);
  }
}
