import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Project } from '../models/project';
import { ProjectDTO } from '../models/projectDto';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {

  transform(value: ProjectDTO[], filterText:string): ProjectDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:ProjectDTO)=>p.name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
