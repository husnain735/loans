import { Component } from '@angular/core';

@Component({
  selector: 'app-financial-goals',
  templateUrl: './financial-goals.component.html',
  styleUrls: ['./financial-goals.component.scss']
})
export class FinancialGoalsComponent {
  textarea:string;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.textarea = undefined;
  }

  RetirementIncome = [
    "$40,000","$50,000","$60,000","$70,000","$80,000"
  ];

}
