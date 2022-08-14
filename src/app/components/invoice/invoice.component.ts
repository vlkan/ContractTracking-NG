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
  tempprojects: Project[] = []
  isDelete: string;

  currencyType: number
  currencyTypeNew: string
  currencyTypeSelect:number

  selectedCurrencyType:number = 1

  invoiceAddForm: FormGroup
  constructor(private invoiceService: InvoiceService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,) { }


  ngOnInit(): void {
    //this.getInvoices()
    this.getProjects()
    this.createInvoiceAddForm()
    this.activatedRoute.params.subscribe((params) => {
      if (params['start'] && params['end']) {
        this.getInvoiceDateRange(params['start'], params['end']);
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
  getInvoiceDateRange(start: Date, end: Date){
    this.invoiceService.getInvoiceDateRange(start, end).subscribe((response) => {
      this.invoicedetails = response.data;
      this.dataLoaded = true;
    })
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
  getCurrencyTypeEnum(type: number) {
    this.currencyTypeNew = CurrencyTypeE[type];
    return this.currencyTypeNew
  }
  getIsDeletedEnum(type: number) {
    this.isDelete = EnumIsDeleted[type];
  }
  getCurrencyTypeSelect(){

  }
  setCurrencyType(project: string){
    for(let i = 0; i<this.projects.length; i++){
      if (this.projects[i]["name"] == project){
        this.currencyType = this.projects[i]["currencyType"]
      }
    }
  }
  addInvoice(){
    console.log(this.invoiceAddForm.value)
    if(this.invoiceAddForm.valid){
      let invoiceModel = Object.assign({}, this.invoiceAddForm.value)
      this.invoiceService.addInvoice(invoiceModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.updateRemainingBudget(invoiceModel.projectId, invoiceModel.feePaid)
        this.ngOnInit()
        $('#addInvoiceModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  updateCurrency(event: Event){

  }
  updateRemainingBudget(projectId: number, feePaid: number){
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i]["id"] == projectId) {
        console.log(this.projects[i]["remainingContractBudget"])
        this.tempprojects.push(this.projects[i])
      }
    }

    this.tempprojects[0].remainingContractBudget = (this.tempprojects[0].remainingContractBudget) - feePaid
    this.projectService.updateProject(this.tempprojects[0]).subscribe((response) => {
      this.toastrService.success(response.message)
    })
    this.tempprojects.pop()
  }
  updateRemainingBudgetBack(projectName: string, feePaid: number){
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i]["name"] == projectName) {
        console.log(this.projects[i]["remainingContractBudget"])
        this.tempprojects.push(this.projects[i])
      }
    }
    this.tempprojects[0].remainingContractBudget = (this.tempprojects[0].remainingContractBudget) + feePaid
    this.projectService.updateProject(this.tempprojects[0]).subscribe((response) => {
      this.toastrService.success(response.message)
    })
    this.tempprojects.pop()
  }
  deleteInvoice(invoice: InvoiceDTO, id: number){
    if(confirm("Are you sure to delete?")) {
      this.invoiceService.softDeleteInvoice(id).subscribe(response => {
        this.toastrService.success(response.message)
        this.updateRemainingBudgetBack(invoice.projectName, invoice.feePaid)
        this.ngOnInit()
      })
    }
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

enum CurrencyTypeE {
  "₺" = 1,
  "$" = 2,
  "€" = 3,
  "£" = 4,
}

enum EnumIsDeleted {
  'No' = 0,
  'Yes' = 1,
}

