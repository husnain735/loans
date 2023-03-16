import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalysisService } from 'src/app/shared/services/analysis.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  ApplicationId: string;
  AssetsIncome: number = 0;
  FamilyExpenses: number = 0;
  LivingExpenses: number = 0;


  constructor(protected route: ActivatedRoute,
              private _analysisService: AnalysisService){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.ApplicationId = params['guid'];
    });
    this.getReviewDetails();
  }


  getReviewDetails(){
    this._analysisService.getReviewDetails(this.ApplicationId).subscribe(res =>{
      console.log(res);
      this.AssetsIncome = res.body.AssetsIncome;
      this.FamilyExpenses = res.body.FamilyExpenses;
      this.LivingExpenses = res.body.LivingExpenses;
    })

  }

}
