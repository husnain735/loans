import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private _apiService: ApiService, private httpClient: HttpClient) { }

  getApplicationMeta(){
    var url ='api/Application/GetApplicationMeta';
    return this._apiService.get(url);
  } 
  
  saveApplication(applicationObj: Application){
    var url = 'api/Application/SaveApplication';
    return this._apiService.post(url, applicationObj);
  }

  saveApplicant(applicant: any){
    var url = 'api/Application/SaveApplicant';
    return this._apiService.post(url, applicant);
  }
} 
