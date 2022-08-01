import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectResponseModel } from 'src/app/models/projectResponseModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  apiUrl = 'https://localhost:7032/api/projects/getall';

  constructor(private httpClient: HttpClient) {
    this.getProjects()
  }

  ngOnInit(): void { }

  getProjects() {
    this.httpClient
      .get<ProjectResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.projects = response.data;
      });
  }
}
