import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-game-plan',
  templateUrl: './game-plan.component.html',
  styleUrls: ['./game-plan.component.scss']
})
export class GamePlanComponent implements OnInit {

  GamePlanForm: FormGroup;
  foods = [
    {value: 1, viewValue: 'Group 1'},
    {value: 2, viewValue: 'Group 2'},
    {value: 3, viewValue: 'Group 3'},
    {value: 4, viewValue: 'Group 4'}
  ];
  constructor(private rxFormBuilder: RxFormBuilder) {

  }

  ngOnInit(): void {
    this.GamePlanForm = this.rxFormBuilder.group({
      BrokerId: new FormControl('', [Validators.required]),
      PlanDate: ['', [Validators.required]],
      LenderId: new FormControl('', [Validators.required]),
      ClientName: ['', [Validators.required]],
      RefererId: new FormControl('', [Validators.required]),
      PrimaryPurposeId: new FormControl('', [Validators.required]),
    });
  }

  add (newValue: string): void {
    newValue = newValue.trim();
    if(!newValue) {return;}
    this.foods.push({value: -1,'viewValue':newValue});
  }
  onGamePlanSubmit(){
    if (this.GamePlanForm.invalid){
      return;
    }
    console.log(this.GamePlanForm.value);
  }
}
