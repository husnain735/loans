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

}
