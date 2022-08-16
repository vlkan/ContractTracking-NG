import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

declare var $ : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  projects: Project[] = [];
  currentEmployee: Employee
  filterText = '';
  isDelete: string;
  searchName: string;

  employeeAddForm: FormGroup
  employeeUpdateForm: FormGroup
  constructor(private employeeService: EmployeeService,
     private toastrService: ToastrService,
      private formBuilder:FormBuilder,
       private projectService: ProjectService,
       private activatedRoute: ActivatedRoute
       ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchName']) {
        this.getEmployeesByName(params['searchName']);
      } else {
        this.getEmployees()
      }
    });

    this.createEmployeeAddForm()
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      console.log(response);
    });
  }

  getEmployeesByName(name: string) {
    this.employeeService.getEmployeesName(name).subscribe((response) => {
      this.employees = response.data;
      console.log(response);
    });
  }

  addEmployee(){
    if(this.employeeAddForm.valid){
      let employeeModel = Object.assign({}, this.employeeAddForm.value)
      this.employeeService.addEmployee(employeeModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#addEmployeeModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteEmployee(employee: Employee, id: number){
    if(confirm("Are you sure to delete?")) {
      this.employeeService.softDeleteEmployee(id).subscribe((response) => {
        this.toastrService.success(response.message, employee.name)
        this.ngOnInit()
      })
    }
  }
  updateEmployee(){
    console.log(this.employeeUpdateForm.value)
    if(this.employeeUpdateForm.valid){
      let employeeModel = Object.assign({}, this.employeeUpdateForm.value)
      this.employeeService.updateEmployee(employeeModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#updateEmployeeModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }

  getIsDeletedEnum(type: number) {
    this.isDelete = EnumIsDeleted[type];
  }

  setCurrentEmployee(employee: Employee) {
    this.currentEmployee = employee;
    this.createEmployeeUpdateForm()
  }
  getCurrentEmployeeClass(employee: Employee) {
    if (employee == this.currentEmployee) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllEmployeeClass() {
    if (!this.currentEmployee) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  createEmployeeAddForm(){
    this.employeeAddForm = this.formBuilder.group({
      id:[0],
      name:["", Validators.required],
      surname:["", Validators.required],
      email:["", Validators.required],
      jobTitle:["", Validators.required],
      startDate:[new Date, Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
  createEmployeeUpdateForm(){
    this.employeeUpdateForm = this.formBuilder.group({
      id:[this.currentEmployee.id],
      name:[this.currentEmployee.name, Validators.required],
      surname:[this.currentEmployee.surname, Validators.required],
      email:[this.currentEmployee.email, Validators.required],
      jobTitle:[this.currentEmployee.jobTitle, Validators.required],
      startDate:[this.currentEmployee.startDate, Validators.required],
      isDeleted:[0],
      createdAt:[this.currentEmployee.createdAt,],
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
