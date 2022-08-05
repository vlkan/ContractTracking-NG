import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder, } from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/angular';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { WorkList } from 'src/app/models/worklist';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { WorklistService } from 'src/app/services/worklist.service';
import { createEventId, DateUtil, INITIAL_EVENTS } from './worklist-utils';

declare var $ : any;

@Component({
  selector: 'app-worklist-calendar',
  templateUrl: './worklist-calendar.component.html',
  styleUrls: ['./worklist-calendar.component.css']
})
export class WorklistCalendarComponent implements OnInit {
  worklists: WorkList[] = []
  employees: Employee[] = []
  projects: Project[] = []

  convList: EventInput[] = []

  workAddForm: FormGroup
  workUpdateForm: FormGroup
  constructor(private workListService: WorklistService,
     private employeeService: EmployeeService,
      private projectService:ProjectService,
       private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.getWorkLists()
    this.createWorkAddForm()
    this.getEmployees()
    this.getProjects()
    console.log(this.convList)
  }
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.convList, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.convList,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  }
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    $('#addWork').modal('show');
    const title = "";
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  getWorkLists() {
    this.workListService.getWorkLists().subscribe((response) => {
      this.worklists = response.data;
      console.log(response);
      this.worklists.forEach(element => {
        this.convList.push({
          id: String(element.id),
          title: element.name,
          start: new Date().toISOString().replace(/T.*$/, '')
        })
      })
    });
    console.log(this.convList)

  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      console.log(response);
    });
  }
  getProjects() {
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response.data;
      console.log(response);
    });
  }
  createWorkAddForm(){
    this.workAddForm = this.formBuilder.group({
      id:[0],
      employee:["", Validators.required],
      project:[, Validators.required],
      hour:[8, Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
  createWorkUpdateForm(){
    this.workUpdateForm = this.formBuilder.group({
      id:[0],
      employee:["", Validators.required],
      project:[, Validators.required],
      hour:[8, Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
}

