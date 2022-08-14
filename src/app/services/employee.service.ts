import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<ListResponseModel<Employee>> {
    let newApi = this.apiUrl + "/employees/getall"
    return this.httpClient.get<ListResponseModel<Employee>>(newApi);
  }
  deleteEmployee(employee: Employee):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/employees/delete"
    return this.httpClient.post<ResponseModel>(newApi, employee)
  }
  softDeleteEmployee(id: number):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/employees/deletebyid"
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addEmployee(employee: Employee):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/employees/add"
    return this.httpClient.post<ResponseModel>(newApi, employee)
  }
  updateEmployee(employee: Employee):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/employees/update"
    return this.httpClient.post<ResponseModel>(newApi, employee)
  }
}
