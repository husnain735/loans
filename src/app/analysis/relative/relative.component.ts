import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.scss']
})
export class RelativeComponent implements OnInit {


  RelativeForm: FormGroup
  ApplicationID: string;

  constructor(private rxFormBuilder: RxFormBuilder,
              public sharedService: SharedService,
              private route: ActivatedRoute,
              private _analysisService: AnalysisService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.ApplicationID = params['guid'];
    });
    this.AddRelativeForm();
    this.getRelative(this.ApplicationID);
  }


  AddRelativeForm(){
    this.RelativeForm = this.rxFormBuilder.group({
      RelativeId: null,
      FullName: ['', [RxwebValidators.required()]],
      RelationShipToYou: ['', [RxwebValidators.required()]],
      ContactNumber: ['', [RxwebValidators.required()]],
      ApplicantId: ['', [RxwebValidators.required()]],
      AusResidentialAddress: ['', [RxwebValidators.required()]]
    })
  }


  onRelativeFormSubmit(){
    if (this.RelativeForm.invalid) {
      this.RelativeForm.markAllAsTouched();
      return;
    }
    else{
      var relativeForm : any = {};
      relativeForm = this.RelativeForm.value;
      relativeForm.ApplicationID = this.ApplicationID;
      this._analysisService.SaveRelative(relativeForm).subscribe(res =>{
        console.log(res);
        this.resetRelativeForm(res.body);

      })
    }
  }

  resetRelativeForm(i){
    this.RelativeForm = undefined;
    this.AddRelativeForm();
    this.patchRelativeForm(i);
  }

  patchRelativeForm(i){
    debugger
    this.ApplicationID = i.ApplicationID;

    this.RelativeForm = this.rxFormBuilder.group({
      RelativeId: i.RelativeID,
      FullName: [i.FullName, [RxwebValidators.required()]],
      RelationShipToYou: [i.RelationShipToYou, [RxwebValidators.required()]],
      ContactNumber: [i.ContactNumber, [RxwebValidators.required()]],
      ApplicantId: [i.ApplicantId, [RxwebValidators.required()]],
      AusResidentialAddress: [i.AusResidentialAddress, [RxwebValidators.required()]]
    })
  }

  getRelative(id:any){
    this._analysisService.GetRelative(id).subscribe(res =>{
      console.log(res);
      this.patchRelativeForm(res.body)
    })
  }

}
