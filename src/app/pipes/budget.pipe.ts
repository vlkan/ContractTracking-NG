import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'budget'
})
export class BudgetPipe implements PipeTransform {

  transform(value: Project[], filterText:string): Project[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:Project)=>c.name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
