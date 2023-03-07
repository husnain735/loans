import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { AnalysisService } from 'src/app/shared/services/analysis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userAddressValidations: FormGroup;
  toppings = this.formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  selectedCountry: string = 'GB';
  LoanBroker: any = [];
  ApplicationReason: any = [];
  applicationObj: Application;

  selectedCountryControl = new FormControl(this.selectedCountry);

  isSubmitted = false;
  guid: string;
  routeName: string;
  key = environment.key.password;
  password: string;
  IsTrue = false;
  error = false;
  @ViewChild('content', { static: true }) content: TemplateRef<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _analysisService: AnalysisService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    localStorage.clear();
    this.openApplicantDailog(this.content);
    this.getMeta();
    if (this.router.url != '/') {
      var url = this.router.url;
      this.guid = url;
    }
    this.userAddressValidations = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      LoansBroker: new FormControl('', [Validators.required]),
      ApplicationReason: this.formBuilder.array([] , [Validators.required])
    });
    this.applicationObj = new Application();
  }
  onSubmit() {

    this.isSubmitted = true;
    if (this.userAddressValidations.invalid) {
      return;
    }
    else{
      this.applicationObj = new Application();
      this.applicationObj.EmailAddress = this.userAddressValidations.value.Email;
      this.applicationObj.LoansBrokerId = this.userAddressValidations.value.LoansBroker;
      this.applicationObj.ReasonIDS = this.userAddressValidations.value.ApplicationReason.toString();
      this._analysisService.saveApplication(this.applicationObj).subscribe((res:any) =>{
        if (res.body != '0') {
          this.guid = res.body;
          localStorage.setItem('ApplicationId',this.guid);
          this.router.navigate(['client/' + this.guid + '/applicant']);
        }

      })
    }

  }
  getMeta() {
    this._analysisService.getApplicationMeta().subscribe((res: any) => {
      this.ApplicationReason = res.body.ApplicationReason;
      this.LoanBroker = res.body.LoansBroker;
      console.log(this.ApplicationReason)
      console.log(this.LoanBroker);
    })
  }
  onChange(event) {
    const interests = <FormArray>this.userAddressValidations.get('ApplicationReason') as FormArray;

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }
  openApplicantDailog(content): void {
    const dialogRef = this.dialog.open(content, {
      height: '230px',
      width: '500px',
      disableClose: true
    });
  }
  checkPassword(){
    if (this.password == this.key) {
      this.dialog.closeAll();
      this.IsTrue = true;
    }else{
      this.error = true;
    }
  }
}
