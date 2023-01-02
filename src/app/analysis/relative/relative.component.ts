import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.scss']
})
export class RelativeComponent implements OnInit {


  RelativeForm: FormGroup

  constructor(private rxFormBuilder: RxFormBuilder, public sharedService: SharedService) {

  }

  ngOnInit() {
    this.RelativeForm = this.rxFormBuilder.group({
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
    console.log(this.RelativeForm.value);
  }
}
