import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  dataLoaded = false

  constructor(private projectService:ProjectService) {}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.projectService.getProjects().subscribe(response =>{
      this.projects = response.data
      this.dataLoaded = true
    })
  }
}
