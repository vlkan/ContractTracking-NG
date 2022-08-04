import { Pipe, PipeTransform } from '@angular/core';
import { Payment } from '../models/payment';

@Pipe({
  name: 'filterPayment'
})
export class FilterPaymentPipe implements PipeTransform {

  transform(value: Payment[], filterText:string): Payment[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Payment)=>p.name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
