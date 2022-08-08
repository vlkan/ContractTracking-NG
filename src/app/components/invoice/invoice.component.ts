import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { Project } from 'src/app/models/project';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = []
  invoicedetails: InvoiceDTO[] = []
  projects: Project[] = []
  currentInvoice: Invoice;
  dataLoaded = false;
  filterText = '';
  constructor(private invoiceService: InvoiceService,
    private projectService: ProjectService,
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
    this.invoiceService.getInvoiceDetails().subscribe((response) => {
      this.invoicedetails = response.data;
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
  getProjects(){
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentInvoice(invoice: Invoice) {
    this.currentInvoice = invoice;
    console.log(invoice);
    //this.createProjectUpdateForm();
  }
  addInvoice(){

  }
}
