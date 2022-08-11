import { Pipe, PipeTransform } from '@angular/core';
import { ProjectDTO } from '../models/projectDto';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {

  transform(value: ProjectDTO[], filterText:string): ProjectDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:ProjectDTO)=>(c.name.toLocaleLowerCase().indexOf(filterText) && (c.customerOwnerName.toLocaleLowerCase().indexOf(filterText)))!==-1):value
  }

}
