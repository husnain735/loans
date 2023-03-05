import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(dataArray: any, filterValue: any, propName: string) {
    if (dataArray == undefined || (filterValue == undefined || filterValue == '' && filterValue != 0)
    || (dataArray != undefined && dataArray.length == 0)) {
      return dataArray;
    }
    return dataArray.filter(item => item[propName] == filterValue);
  }

}
