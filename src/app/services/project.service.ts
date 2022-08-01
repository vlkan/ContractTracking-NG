import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'https://localhost:7032/api/';
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ListResponseModel<Project>> {
    let newPath = this.apiUrl + "projects/getall"
    return this.httpClient.get<ListResponseModel<Project>>(newPath);
  }
  getProjectsByCustomer(customerId:number): Observable<ListResponseModel<Project>> {
    let newPath = this.apiUrl + "products/getbycustomer?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<Project>>(newPath);
  }
}
