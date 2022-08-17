import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';

@Component({
  selector: 'app-addcp',
  templateUrl: './addcp.component.html',
  styleUrls: ['./addcp.component.css']
})
export class AddcpComponent implements OnInit {

  checkCustomer: boolean = true
  checkProject:boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openAddCustomer(){
    this.checkProject = false
    this.checkCustomer = true
  }
  openAddProject(){
    this.checkCustomer = false
    this.checkProject = true
  }

}
