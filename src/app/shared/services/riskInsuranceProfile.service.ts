import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class RiskInsuranceProfileService {

  pageUrl = 'RiskInsuranceProfile/';
  constructor(private apiService: ApiService) { }


  SaveRiskInsuranceProfile(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveRiskInsuranceProfile/`, obj);
  }
  GetRiskInsuranceProfile(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetRiskInsuranceProfile/`, obj);
  }
}
