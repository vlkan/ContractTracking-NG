import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

declare var $ : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  currentEmployee: Employee

  employeeAddForm: FormGroup
  constructor(private employeeService: EmployeeService, private toastrService: ToastrService, private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.getEmployees()
    this.createEmployeeAddForm()
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      console.log(response);
    });
  }
  addEmployee(){
    if(this.employeeAddForm.valid){
      let employeeModel = Object.assign({}, this.employeeAddForm.value)
      this.employeeService.addEmployee(employeeModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
      $('#addEmployeeModal').modal('hide');
      setTimeout(()=>{
        this.ngOnInit()
      },200)
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteEmployee(employee: Employee){
    this.employeeService.deleteEmployee(employee).subscribe((response) => {
      this.toastrService.success(response.message, employee.name)
    })
    setTimeout(()=>{
      this.ngOnInit()
    },200)
  }
  setCurrentEmployee(employee: Employee) {
    this.currentEmployee = employee;
    //this.createEmployeeUpdateForm()
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

}
