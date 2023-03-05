import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LivingExpenseService {

  pageUrl = 'Expenses/';
  constructor(private apiService: ApiService) { }


  SaveLivingExpenses(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveLivingExpenses/`, obj);
  }
  GetLivingExpenses(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}GetLivingExpenses/`, obj);
  }
}
