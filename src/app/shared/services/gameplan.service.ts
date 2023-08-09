import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class GamePlanService {

  pageUrl = 'GamePlan/';
  constructor(private apiService: ApiService) { }

  SaveGamePlan(obj: any): Observable<any> {
    return this.apiService.post(`${this.pageUrl}SaveGamePlan/`, obj);
  }
}
