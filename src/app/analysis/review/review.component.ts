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
    })

  }

}
