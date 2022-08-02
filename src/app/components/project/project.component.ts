import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filterText = ""

  constructor(private projectService:ProjectService,
     private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["customerId"]){
        this.getProjectsByCustomer(params["customerId"])
      }else{
        this.getProjects()
      }
    })
  }

  getProjects() {
    this.projectService.getProjects().subscribe(response =>{
      this.projects = response.data
      this.dataLoaded = true
    })
  }

  getProjectsByCustomer(customerId:number) {
    this.projectService.getProjectsByCustomer(customerId).subscribe(response =>{
      this.projects = response.data
      this.dataLoaded = true
    })
  }
}
