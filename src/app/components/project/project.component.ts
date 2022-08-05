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
  currentProject: Project;

  projectAddForm: FormGroup
  projectUpdateForm: FormGroup

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
        this.getProjectsByCustomer(params['customerId']);
      } else {
        this.getProjects()
      }
    });
    this.createProjectAddForm();
    this.getCustomers();
    this.getEmployees()
  }
  getProjects() {
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response.data;
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
  addProject() {
    console.log(this.projectAddForm.value)
    if(this.projectAddForm.valid){
      let projectModel = Object.assign({}, this.projectAddForm.value)
      this.projectService.addProject(projectModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
      $('#addProjectModal').modal('hide');
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
      })
      $('#updateProjectModal').modal('hide');
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteProject(project: Project) {
    this.projectService.deleteProject(project).subscribe(response => {
      this.toastrService.success(response.message, project.name)
    })
    $('#projectDetailModal').modal('hide');
  }
  setCurrentProject(project: Project) {
    this.currentProject = project;
    console.log(project);
    this.createProjectUpdateForm();
  }
  getProjectsByCustomer(customerId: number) {
    this.projectService
      .getProjectsByCustomer(customerId)
      .subscribe((response) => {
        this.projects = response.data;
        this.dataLoaded = true;
      });
  }
  getProjectTypeEnum(type: number) {
    this.projectType = ProjectType[type];
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
      currencyType:[1, Validators.required],
      contractTerm:[, Validators.required],
      contractStartDate:["", Validators.required],
      workerDay:[, Validators.required],
      workerHour:[, Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
  createProjectUpdateForm(){
    this.projectUpdateForm = this.formBuilder.group({
      id:[this.currentProject.id],
      name:["", Validators.required],
      type:[, Validators.required],
      subType:["", Validators.required],
      employeeOwnerId:[1, Validators.required],
      customerOwnerId:[1, Validators.required],
      description:["", Validators.required],
      contractBudget:[0, Validators.required],
      currencyType:[1, Validators.required],
      contractTerm:[0, Validators.required],
      contractStartDate:["", Validators.required],
      workerDay:[0, Validators.required],
      workerHour:[0, Validators.required],
      isDeleted:[0],
      createdAt:[this.currentProject.createdAt,],
      modifiedAt:[new Date,]
    })
  }
}

enum ProjectType {
  System = 1,
  Software = 2,
  SystemAndSoftware = 3,
}

enum CurrencyTypeE {
  TurkishLira = 1,
  Dollar = 2,
  Euro = 3,
  Pound = 4,
}

enum EnumIsDeleted {
  No = 0,
  Yes = 1,
}
