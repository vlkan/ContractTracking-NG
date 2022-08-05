import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = []
  currentInvoice: Invoice;
  dataLoaded = false;
  filterText = '';
  constructor(private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['employeeId']) {
        this.getInvoicesByEmployee(params['employeeId']);
      } else {
        this.getInvoices()
      }
    });
  }
  getInvoices() {
    this.invoiceService.getInvoices().subscribe((response) => {
      this.invoices = response.data;
      this.dataLoaded = true;
    });
  }
  getInvoicesByEmployee(employeeId: number) {
    this.invoiceService
      .getInvoicesByEmployee(employeeId)
      .subscribe((response) => {
        this.invoices = response.data;
        this.dataLoaded = true;
      });
  }
  setCurrentInvoice(invoice: Invoice) {
    this.currentInvoice = invoice;
    console.log(invoice);
    //this.createProjectUpdateForm();
  }
}
