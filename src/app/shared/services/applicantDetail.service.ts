import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ApplicantDetailService {

  pageUrl = 'ApplicantDetail/';
  constructor(private apiService: ApiService) { }

  SaveApplicantDetail(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicantDetail/`, obj);
  }
  GetApplicantDetail(obj): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetApplicantDetail/`, obj);
  }
  SaveApplicantDetailAddress(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicantDetailAddress/`, obj);
  }
  SaveApplicantContactInformation(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicantContactInformation/`, obj);
  }
  SaveApplicantEmployeeDetails(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicantEmployeeDetails/`, obj);
  }
  SaveApplicantOtherIncomes(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveApplicantOtherIncomes/`, obj);
  }
  DeleteApplicantDetailsForms(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}DeleteApplicantDetailsForms/`, obj);
  }
}
