import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectDTO } from 'src/app/models/projectDto';
import { Employee } from 'src/app/models/employee';
import { Customer } from 'src/app/models/customer';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from 'src/app/services/customer.service';

declare var $ : any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  employees: Employee[] = [];
  customers: Customer[]=[];
  projectDetailed: ProjectDTO[] = [];
  dataLoaded = false;
  filterText = '';
  projectType: string;
  currencyType: string;
  currentProject: ProjectDTO;
  remainingDays:number;
  endDate:number
  isDelete: string;
  searchText: string;

  remainingContractBudgetval: number;
  remainingWorkerHourval: number;

  projectAddForm: FormGroup
  projectUpdateForm: FormGroup
  projectDeleteForm:FormGroup

  whichCustomer: any

  selectedEmployeeOwner: string

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.getProjectDetailsByCustomerId(params['customerId']);
      }else if (params['searchText']) {
        this.getProjectsName(params['searchText'])
      } else {
        this.getProjectDetails()
      }
    });
    this.createProjectAddForm();
    this.getCustomers();
    this.getEmployees()
  }
  getProjects() {
    this.projectService.getProjectDetails().subscribe((response) => {
      this.projectDetailed = response.data;
      this.dataLoaded = true;
    });
  }

  getProjectsName(text: string) {
    this.projectService.getProjectsName(text).subscribe((response) => {
      this.projectDetailed = response.data;
      this.dataLoaded = true;
    });
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
  getProjectDetails() {
    this.projectService.getProjectDetails().subscribe((response) => {
      this.projectDetailed = response.data;
      this.dataLoaded = true;
    });
  }
  getProjectDetailsByCustomerId(customerId: number){
    this.projectService
    .getProjectDetailsByCustomerId(customerId)
    .subscribe((response) => {
      this.projectDetailed = response.data;
      this.dataLoaded = true;
    });
  }
  addProject() {
    console.log(this.projectAddForm.value)
    if(this.projectAddForm.valid){
      let projectModel = Object.assign({}, this.projectAddForm.value)
      this.projectService.addProject(projectModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#addProjectModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  updateProject() {
    if(this.projectUpdateForm.valid){
      let projectModel = Object.assign({}, this.projectUpdateForm.value)
      this.projectService.updateProject(projectModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#updateProjectModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteProject(id: number) {
    if(confirm("Are you sure to delete?")) {
      this.projectService.softDeleteProject(id).subscribe(response => {
        this.toastrService.success(response.message)
        $('#projectDetailModal').modal('hide');
          this.ngOnInit()
      })
    }
  }
  setCurrentProject(project: ProjectDTO) {
    this.currentProject = project;
    this.createProjectUpdateForm();
  }
  calculateRemainingDays(start:Date, term:number){
    let todayDate = new Date().getDate()
    let startDate = new Date(start).getDate()
    this.remainingDays = startDate+term-todayDate
  }
  calculateRemainingDaysEnd(start:Date, term:number){
    let todayDate = new Date().getDate()
    let startDate = new Date(start)
    this.endDate = (startDate.setDate((startDate.getDate()+term)) - todayDate)
  }
  getProjectsByCustomer(customerId: number) {
    this.projectService
      .getProjectDetailsByCustomerId(customerId)
      .subscribe((response) => {
        this.projectDetailed = response.data;
        this.dataLoaded = true;
      });
  }
  getProjectTypeEnum(type: number) {
    this.projectType = ProjectType[type];
  }
  getIsDeletedEnum(type: number) {
    this.isDelete = EnumIsDeleted[type];
  }
  getCurrencyTypeEnum(type: number) {
    this.currencyType = CurrencyTypeE[type];
  }
  createProjectAddForm(){
    this.projectAddForm = this.formBuilder.group({
      id:[0],
      name:["", Validators.required],
      type:[, Validators.required],
      subType:["", Validators.required],
      employeeOwnerId:[, Validators.required],
      customerOwnerId:[, Validators.required],
      description:["", Validators.required],
      contractBudget:[, Validators.required],
      currencyType:[, Validators.required],
      contractTerm:[, Validators.required],
      contractStartDate:[new Date, Validators.required],
      workerDay:[, Validators.required],
      workerHour:[, Validators.required],
      remainingContractBudget: [0,],
      remainingWorkerHour: [0,],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
  createProjectUpdateForm(){
    this.projectUpdateForm = this.formBuilder.group({
      id:[this.currentProject.id],
      name:[this.currentProject.name, Validators.required],
      type:[this.currentProject.type, Validators.required],
      subType:[this.currentProject.subType, Validators.required],
      employeeOwnerId:[this.currentProject.employeeId,Validators.required],
      customerOwnerId:[this.currentProject.customerId, Validators.required],
      description:[this.currentProject.description, Validators.required],
      contractBudget:[this.currentProject.contractBudget, Validators.required],
      currencyType:[this.currentProject.currencyType, Validators.required],
      contractTerm:[this.currentProject.contractTerm, Validators.required],
      contractStartDate:[this.currentProject.contractStartDate.toString().substring(0, 10), Validators.required],
      workerDay:[this.currentProject.workerDay, Validators.required],
      workerHour:[this.currentProject.workerHour, Validators.required],
      remainingContractBudget: [this.currentProject.remainingContractBudget,],
      remainingWorkerHour: [this.currentProject.remainingWorkerHour,],
      isDeleted:[0],
      createdAt:[this.currentProject.createdAt,],
      modifiedAt:[new Date,]
    })
  }
}

enum ProjectType {
  "System" = 1,
  "Software" = 2,
  "System And Software" = 3,
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
