import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  apiUrl = 'https://localhost:7032/api';
  constructor(private httpClient: HttpClient) { }

  getNotifications(): Observable<ListResponseModel<Notification>> {
    let newApi = this.apiUrl + "/notifications/getall"
    return this.httpClient.get<ListResponseModel<Notification>>(newApi);
  }
  deleteNotification(notification: Notification):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/notifications/delete"
    return this.httpClient.post<ResponseModel>(newApi, notification)
  }
  softDeleteNotification(id: number):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/notifications/deletebyid?id=" + id
    return this.httpClient.post<ResponseModel>(newApi, id)
  }
  addNotification(notification: Notification):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/notifications/add"
    return this.httpClient.post<ResponseModel>(newApi, notification)
  }
  updateNotification(notification: Notification):Observable<ResponseModel>{
    let newApi = this.apiUrl + "/notifications/update"
    return this.httpClient.post<ResponseModel>(newApi, notification)
  }
}
