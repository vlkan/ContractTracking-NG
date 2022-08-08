import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceDTO } from '../models/invoiceDTO';

@Pipe({
  name: 'filterInvoice'
})
export class FilterInvoicePipe implements PipeTransform {

  transform(value: InvoiceDTO[], filterText:string): InvoiceDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:InvoiceDTO)=>p.projectName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
