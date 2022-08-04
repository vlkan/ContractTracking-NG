import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) { }

  getPayments(): Observable<ListResponseModel<Payment>> {
    let newApi = this.apiUrl + "/payments/getall"
    return this.httpClient.get<ListResponseModel<Payment>>(newApi);
  }
  getPaymentsByEmployee(employeeId:number): Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + "/payments/getbyemployee?employeeId=" + employeeId
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
  deletePayment(payment: Payment):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/payments/delete"
    return this.httpClient.post<ResponseModel>(newApi, payment)
  }
  addPayment(payment: Payment):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/payments/add"
    return this.httpClient.post<ResponseModel>(newApi, payment)
  }
  updatePayment(payment: Payment):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/payments/update"
    return this.httpClient.post<ResponseModel>(newApi, payment)
  }
}
