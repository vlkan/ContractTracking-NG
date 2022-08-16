import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newApi = this.apiUrl + "/customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newApi);
  }
  getCustomersByName(name: string): Observable<ListResponseModel<Customer>>{
    let newApi = this.apiUrl + "/customers/search?name=" + name
    return this.httpClient.get<ListResponseModel<Customer>>(newApi);
  }
  deleteCustomer(customer: Customer):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/customers/delete"
    return this.httpClient.post<ResponseModel>(newApi, customer)
  }
  softDeleteCustomer(id: number):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/customers/deletebyid?id=" + id
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addCustomer(customer: Customer):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/customers/add"
    return this.httpClient.post<ResponseModel>(newApi, customer)
  }
  updateCustomer(customer: Customer):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/customers/update"
    return this.httpClient.post<ResponseModel>(newApi, customer)
  }
}
