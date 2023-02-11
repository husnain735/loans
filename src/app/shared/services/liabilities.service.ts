import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LiabilitiesService {

  pageUrl = 'Liabilities/';
  constructor(private apiService: ApiService) { }

  SaveLiabilities(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveLiabilities/`, obj);
  }
  GetLiabilities(obj){
    return this.apiService.post(`${this.pageUrl}GetLiabilities/`, obj);
  }
}
