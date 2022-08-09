import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceDTO } from 'src/app/models/invoiceDTO';
import { Project } from 'src/app/models/project';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProjectService } from 'src/app/services/project.service';

declare var $ : any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = []
  invoicedetails: InvoiceDTO[] = []
  invoicedelete: Invoice = {id:0, projectId:0, feePaid:0, description:"", isDeleted:0, createdAt:new Date, modifiedAt:new Date}
  projects: Project[] = []
  currentInvoice: InvoiceDTO;
  dataLoaded = false;
  filterText = '';

  invoiceAddForm: FormGroup
  constructor(private invoiceService: InvoiceService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,) { }


  ngOnInit(): void {
    this.getInvoices()
    this.getProjects()
    this.createInvoiceAddForm()
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
      console.log(response)
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
  setCurrentInvoice(invoice: InvoiceDTO) {
    this.currentInvoice = invoice;
    console.log(invoice);
    //this.createProjectUpdateForm();
  }
  addInvoice(){
    console.log(this.invoiceAddForm.value)
    if(this.invoiceAddForm.valid){
      let invoiceModel = Object.assign({}, this.invoiceAddForm.value)
      this.invoiceService.addInvoice(invoiceModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
      $('#addInvoiceModal').modal('hide');
      setTimeout(()=>{
        this.ngOnInit()
      },200)
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteInvoice(invoice: number){
    this.invoicedelete.id=invoice
    this.invoiceService.deleteInvoice(this.invoicedelete).subscribe(response => {
      this.toastrService.success(response.message)
    })
    setTimeout(()=>{
      this.ngOnInit()
    },200)

  }
  createInvoiceAddForm(){
    this.invoiceAddForm = this.formBuilder.group({
      id:[0],
      projectId:[,Validators.required],
      feePaid:[,Validators.required],
      description:[,Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
}
