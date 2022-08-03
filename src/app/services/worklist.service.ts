import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WorkList } from '../models/worklist';

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
  deleteWorkList(workList: WorkList): Observable<ResponseModel> {
    let newApi = this.apiUrl + "/worklists/delete"
    return this.httpClient.post<ResponseModel>(newApi, workList)
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
