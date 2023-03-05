import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formFilter',
  pure: false
})
export class FormFilterPipe implements PipeTransform {

  transform(FormArray: any, data , formArrayName ,filterValue: any, propName: string) {

    var dataArray = data.get(formArrayName).value;
    if (dataArray == undefined || (filterValue == undefined || filterValue == '' && filterValue != 0)
    || (dataArray != undefined && dataArray.length == 0)) {
      return FormArray;
    }
    var arr = FormArray.filter(item => item.value[propName] == filterValue);
    return arr;
  }

}
