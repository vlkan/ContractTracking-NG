import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budget'
})
export class BudgetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
