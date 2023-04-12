import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  pageUrl = 'Application/';
  constructor(private apiService: ApiService) { }

  GetApplications(){
    return this.apiService.get(`${this.pageUrl}GetApplications`);
  }
  DeleteApplication(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}DeleteApplication/`, obj);
  }
  PrintPDF(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}PrintPDF`, obj);
  }
  GetGamePlanMetadata(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetGamePlanMetadata`, obj);
  }

  GeneratePhaseOnePdf(obj:any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GeneratePhaseOnePdf`, obj);
  }
}
