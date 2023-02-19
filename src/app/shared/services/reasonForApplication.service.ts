import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ReasonForApplicationService {

  pageUrl = 'ReasonForApplication/';
  constructor(private apiService: ApiService) { }

  SaveReasonsForApplication(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveReasonsForApplication/`, obj);
  }
  GetReasonsForApplication(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetReasonsForApplication/`, obj);
  }
}
