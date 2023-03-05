import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class RetirmentPlansService {

  pageUrl = 'RetirementPlans/';
  constructor(private apiService: ApiService) { }


  SaveRetirementPlans(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveRetirementPlans/`, obj);
  }
  GetRetirementPlans(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetRetirementPlans/`, obj);
  }
}
