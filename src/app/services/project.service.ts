import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'https://localhost:7032/api/projects/getall';
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ListResponseModel<Project>> {
    return this.httpClient.get<ListResponseModel<Project>>(this.apiUrl);
  }
}
