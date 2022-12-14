import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/project';
import { ProjectDTO } from '../models/projectDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ListResponseModel<Project>> {
    let newPath = this.apiUrl + "/projects/getall"
    return this.httpClient.get<ListResponseModel<Project>>(newPath);
  }
  getProjectDetails(): Observable<ListResponseModel<ProjectDTO>> {
    let newPath = this.apiUrl + "/projects/getdetails"
    return this.httpClient.get<ListResponseModel<ProjectDTO>>(newPath);
  }
  getProjectDetailsByCustomerId(customerId:number): Observable<ListResponseModel<ProjectDTO>> {
    let newPath = this.apiUrl + "/projects/getdetailsbycustomerid?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<ProjectDTO>>(newPath);
  }
  getProjectsByCustomer(customerId:number): Observable<ListResponseModel<Project>> {
    let newPath = this.apiUrl + "/projects/getbycustomer?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<Project>>(newPath);
  }
  getProjectsName(name: string): Observable<ListResponseModel<ProjectDTO>>{
    let newApi = this.apiUrl + "/projects/search?text=" + name
    return this.httpClient.get<ListResponseModel<ProjectDTO>>(newApi);
  }
  deleteProject(project: Project):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/projects/delete"
    return this.httpClient.post<ResponseModel>(newApi, project)
  }
  softDeleteProject(id: number):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/projects/deletebyid?id=" + id
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addProject(project: Project):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/projects/add"
    return this.httpClient.post<ResponseModel>(newApi, project)
  }
  updateProject(project: Project):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/projects/update"
    return this.httpClient.post<ResponseModel>(newApi, project)
  }
}
