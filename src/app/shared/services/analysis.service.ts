import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  pageUrl = 'Application/';

  constructor(private apiService: ApiService) { }


  getApplicationMeta(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}GetApplicationMeta/`);
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
}
