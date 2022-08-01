import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectResponseModel } from '../models/projectResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'https://localhost:7032/api/projects/getall';
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ProjectResponseModel> {
    return this.httpClient.get<ProjectResponseModel>(this.apiUrl);
  }
}
