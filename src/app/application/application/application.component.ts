import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
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
      full: "Great Britain",
      short: "GB"
    },
    {
      full: "United States",
      short: "US"
    },
    {
      full: "Canada",
      short: "CA"
    }
  ];
  selectedCountry: string = "GB";

  selectedCountryControl = new FormControl(this.selectedCountry);
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]]
    });
  }
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.subtasks != null && this.subtasks.every(t => t.completed);
  }

}
