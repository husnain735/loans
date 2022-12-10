import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
} 
