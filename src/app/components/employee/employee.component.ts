import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  currentEmployee: Employee
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      console.log(response);
    });
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

}
