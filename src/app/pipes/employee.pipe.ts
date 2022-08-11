import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(value: Employee[], filterText:string): Employee[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((e:Employee)=>(e.name.toLocaleLowerCase().indexOf(filterText) && (e.surname.toLocaleLowerCase().indexOf(filterText)))!==-1):value
  }

}
