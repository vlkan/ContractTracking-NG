import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Employee } from 'src/app/models/employee';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  projectAddForm: FormGroup
  employees: Employee[]
  customers: Customer[]

  remainingContractBudgetval: number;
  remainingWorkerHourval: number;

  constructor(private projectService: ProjectService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createProjectAddForm()
    this.getCustomers()
    this.getEmployees()
  }
  addProject(){
    console.log(this.projectAddForm.value)
    if(this.projectAddForm.valid){
      let projectModel = Object.assign({}, this.projectAddForm.value)
      this.projectService.addProject(projectModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
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

}
