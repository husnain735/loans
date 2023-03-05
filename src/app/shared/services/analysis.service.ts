import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApiService } from './api.service';
import { ApplicantsComponent } from 'src/app/analysis/applicants/applicants.component';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  pageUrl = 'Application/';

  constructor(private apiService: ApiService) { }


  getApplicationMeta(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}GetApplicationMeta`);
  }

  saveApplication(obj: Application): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplication/`, obj);
  }

  saveApplicant(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicant/`, obj);
  }

  getAllApplicants(ApplicationID: string): Observable<any> {
    var applicant : Application;
    applicant = new Application();
    applicant.ApplicationId = ApplicationID;
    return this.apiService.post(`${this.pageUrl}GetAllApplicants/`, applicant);
  }

  saveAssets(obj: any){
    debugger
    var url = 'Assets/SaveAssets'
    return this.apiService.post(`${url}`, obj);
  }

  getAllAssets(ApplicationID: string): Observable<any> {
    debugger 
    var url = 'Assets/GetAllAssets'
    var application : Application;
    application = new Application();
    application.ApplicationId = ApplicationID;
    return this.apiService.post(`${url}`, application);
  }

  DeleteAssets(obj: any): Observable<any> {
    var url = 'Assets/DeleteAssets';
    return this.apiService.post(`${url}`, obj);
  }

  SaveRelative(obj: any): Observable<any> {
    var url = 'Relative/SaveRelativeDetails';
    return this.apiService.post(`${url}`, obj);
  }

  GetRelative(id: any): Observable<any> {
    var url = 'Relative/GetRelativeDetails';
    var application : Application = new Application();
    application.ApplicationId = id;
    return this.apiService.post(`${url}`, application);
  }

  SaveFinancialGoals(obj: any): Observable<any> {
    var url = 'FinancialGoals/SaveFinancialGoals';
    return this.apiService.post(`${url}`, obj);
  }

  GetFinancialGoals(id: any): Observable<any> {
    var url = 'FinancialGoals/GetFinancialGoals';
    var application : Application = new Application();
    application.ApplicationId = id;
    return this.apiService.post(`${url}`, application);
  }

}
