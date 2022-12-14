import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WorkList } from '../models/worklist';
import { WorkListDTO } from '../models/workListDto';


let headers = new Headers({ 'Content-Type': 'application/json' });
@Injectable({
  providedIn: 'root'
})
export class WorklistService {
  apiUrl = 'https://localhost:7032/api';

  constructor(private httpClient: HttpClient) { }

  getWorkLists(): Observable<ListResponseModel<WorkList>> {
    let newApi = this.apiUrl + "/worklists/getall"
    return this.httpClient.get<ListResponseModel<WorkList>>(newApi);
  }
  getWorkListDetails(): Observable<ListResponseModel<WorkListDTO>> {
    let newPath = this.apiUrl + "/worklists/getdetails"
    return this.httpClient.get<ListResponseModel<WorkListDTO>>(newPath);
  }
  deleteWorkList(workList: WorkList): Observable<ResponseModel> {
    let newApi = this.apiUrl + "/worklists/delete"
    return this.httpClient.post<ResponseModel>(newApi, workList)
  }
  softDeleteWorkList(id: number): Observable<ResponseModel> {
    let newApi = this.apiUrl + "/worklists/deletebyid?id=" + id
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addWorkList(workList: WorkList): Observable<ResponseModel> {
    let newApi = this.apiUrl + "/worklists/add"
    return this.httpClient.post<ResponseModel>(newApi, workList)
  }
  updateWorkList(workList: WorkList): Observable<ResponseModel> {
    let newApi = this.apiUrl + "/worklists/update"
    return this.httpClient.post<ResponseModel>(newApi, workList)
  }
}
