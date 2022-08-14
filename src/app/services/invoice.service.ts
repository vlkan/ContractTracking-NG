import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceDTO } from '../models/invoiceDTO';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) { }

  getInvoices(): Observable<ListResponseModel<Invoice>> {
    let newApi = this.apiUrl + "/invoicing/getall"
    return this.httpClient.get<ListResponseModel<Invoice>>(newApi);
  }
  getInvoicesByEmployee(employeeId:number): Observable<ListResponseModel<Invoice>> {
    let newPath = this.apiUrl + "/invoicing/getbyemployee?employeeId=" + employeeId
    return this.httpClient.get<ListResponseModel<Invoice>>(newPath);
  }
  getInvoiceDetails(): Observable<ListResponseModel<InvoiceDTO>>{
    let newPath = this.apiUrl + "/invoicing/getdetails"
    return this.httpClient.get<ListResponseModel<InvoiceDTO>>(newPath);
  }
  getInvoiceDateRange(start: Date, end: Date): Observable<ListResponseModel<InvoiceDTO>>{
    let newPath = this.apiUrl + "/invoicing/search?start=" + start + "&end=" + end
    return this.httpClient.get<ListResponseModel<InvoiceDTO>>(newPath);
  }
  deleteInvoice(invoice: Invoice):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/invoicing/delete"
    return this.httpClient.post<ResponseModel>(newApi, invoice)
  }
  softDeleteInvoice(id: number):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/invoicing/deletebyid?id=" + id
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addInvoice(invoice: Invoice):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/invoicing/add"
    return this.httpClient.post<ResponseModel>(newApi, invoice)
  }
  updateInvoice(invoice: Invoice):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/invoicing/update"
    return this.httpClient.post<ResponseModel>(newApi, invoice)
  }
}
