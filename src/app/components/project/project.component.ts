import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Project } from 'src/app/models/project';
import { CustomerService } from 'src/app/services/customer.service';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  dataLoaded = false;
  filterText = '';
  projectType: string;
  currencyType: string;
  currentProject: Project;

  customers: Customer[] = [];
  currentCustomer: Customer;
  customerType: string;

  addCustomerForm:FormGroup

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.getProjectsByCustomer(params['customerId']);
      } else {
        this.getProjects();
      }
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentProject(project: Project) {
    this.currentProject = project;
    console.log(project)
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
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response);
    });
  }
  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe()
  }
  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(response => {
      this.toastrService.success(response.message, customer.name)
    })
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
  }
  getCurrentCustomerClass(customer: Customer) {
    if (customer == this.currentCustomer) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllCustomerClass() {
    if (!this.currentCustomer) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCustomerTypeEnum(type: number) {
    this.customerType = CustomerType[type];
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
enum CustomerType {
  'Individual' = 1,
  'Corporate' = 2,
}
