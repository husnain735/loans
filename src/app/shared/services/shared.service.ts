import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  TotalApplicants:any[] = [];
  config: NgxUiLoaderConfig;

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.config = this.ngxUiLoaderService.getDefaultConfig();
    // this.config.bgsColor = "#000000";
    // this.config.pbColor = "#000000";
    // this.config.textColor = "#000000";
    this.config.fgsColor = "#000000";
    // this.config.overlayColor = "#000000";


  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
