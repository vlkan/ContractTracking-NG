import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { trim } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { ProjectDTO } from 'src/app/models/projectDto';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

declare var $ : any;

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

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

  searchText: string

  remainingContractBudgetval: number;
  remainingWorkerHourval: number;

  projectAddForm: FormGroup
  projectUpdateForm: FormGroup
  projectDeleteForm:FormGroup

  constructor(private projectService: ProjectService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchText']) {{
          this.getProjectsName(params['searchText'])
        }
      } else {
        this.getProjectDetails()
      }
    });
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
      console.log(response)
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
    console.log(this.projectUpdateForm.value)
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
  deleteProject() {
    // this.createProjectDeleteForm()
    if(confirm("Are you sure to delete?")) {
      let projectModel = Object.assign({}, this.projectDeleteForm.value)
      this.projectService.deleteProject(projectModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.ngOnInit()
        $('#projectDetailModal').modal('hide');
      })
    }
  }
  setCurrentProject(project: ProjectDTO) {
    this.currentProject = project;
    console.log(project);
    // this.createProjectUpdateForm();
    // this.createProjectDeleteForm();
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
  getCurrencyTypeEnum(type: number) {
    this.currencyType = CurrencyTypeE[type];
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
  "No" = 0,
  "Yes" = 1,
}
