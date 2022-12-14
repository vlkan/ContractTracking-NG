import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';
import { ProjectDTO } from '../models/projectDto';

@Pipe({
  name: 'budget'
})
export class BudgetPipe implements PipeTransform {

  transform(value: ProjectDTO[], filterText:string): ProjectDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:ProjectDTO)=>(c.name.toLocaleLowerCase().indexOf(filterText) && (c.customerOwnerName.toLocaleLowerCase().indexOf(filterText)))!==-1):value
  }

}
