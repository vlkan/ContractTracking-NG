import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm
} from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/angular';
import { start } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { WorkList } from 'src/app/models/worklist';
import { WorkListDTO } from 'src/app/models/workListDto';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { WorklistService } from 'src/app/services/worklist.service';
import { createEventId, INITIAL_EVENTS } from './worklist-utils';

declare var $: any;

const detailModal = document.getElementById('detailsWork')

@Component({
  selector: 'app-worklist-calendar',
  templateUrl: './worklist-calendar.component.html',
  styleUrls: ['./worklist-calendar.component.css']
})
export class WorklistCalendarComponent implements OnInit {
  worklists: WorkList[] = []
  worklistsDetailed: WorkListDTO[] = []
  employees: Employee[] = []
  projects: Project[] = []
  updateprojects: Project[] = []
  tempprojects: Project[] = []
  dateList: EventInput[] = []

  selectedDate: Date

  workAddForm: FormGroup
  workUpdateForm: FormGroup
  constructor(private workListService: WorklistService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees()
    this.getProjects()
    this.getWorkLists()
    this.getWorkListDetails()
    this.getUpdateProjects()
    // console.log(typeof(INITIAL_EVENTS)==typeof(convList))
    // console.log(INITIAL_EVENTS === convList)
    console.log(this.Events)
    setTimeout(() => {
      this.calendarOptions = {
        events: this.Events,
        initialView: 'dayGridMonth', // alternatively, use the `events` setting to fetch from a feed
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
      };
    }, 300);
  }
  calendarVisible = true;
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth', // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  }
  currentEvents: EventApi[] = [];
  selectedEvent: WorkList[] = [];

  getWorkLists() {
    this.workListService.getWorkLists().subscribe((response) => {
      this.worklists = response.data;
      //console.log(response);
      // this.worklists.forEach(element => {
      //   this.Events.push({
      //     id: String(element.id),
      //     title: element.employeeId,
      //     start: new Date(element.workingDate)
      //   })
      // })
    });
  }
  getWorkListDetails() {
    this.workListService.getWorkListDetails().subscribe((response) => {
      this.worklistsDetailed = response.data;
      console.log(response);
      this.worklistsDetailed.forEach(element => {
        this.Events.push({
          id: String(element.id),
          title: element.employeeName + " " + element.employeeSurName + " " + element.workingHours + " Hours",
          start: new Date(element.workingDate)
        })
      })
    });
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
  addWorkList() {
    if (this.workAddForm.valid) {
      let workListModel = Object.assign({}, this.workAddForm.value)
      this.workListService.addWorkList(workListModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        console.log(workListModel.projectId)
        this.updateRemainingHours(workListModel.projectId, workListModel.workingHours)
      })
      $('#addWork').modal('hide');

    } else {
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  getUpdateProjects() {
    this.projectService.getProjects().subscribe((response) => {
      this.updateprojects = response.data;
      console.log(response);
    });
  }
  updateRemainingHours(projectId: number, workinghours: number) {
    for (let i = 0; i < this.updateprojects.length; i++) {
      if (this.updateprojects[i]["id"] == projectId) {
        console.log(this.updateprojects[i]["remainingWorkerHour"])
        this.tempprojects.push(this.updateprojects[i])
      }
    }

    this.tempprojects[0].remainingWorkerHour = (this.tempprojects[0].remainingWorkerHour) - workinghours
    this.projectService.updateProject(this.tempprojects[0]).subscribe((response) => {
      this.toastrService.success(response.message)
    })
    this.tempprojects.pop()
  }
  deleteWorkList(workList: WorkList) {
    console.log(workList.isDeleted)
    this.workListService.deleteWorkList(workList).subscribe(response => {
      this.toastrService.success(response.message)
    })
  }
  createWorkAddForm(date: Date) {
    this.workAddForm = this.formBuilder.group({
      id: [0],
      employeeId: [, Validators.required],
      projectId: [, Validators.required],
      workingHours: [8, Validators.required],
      workingDate: [date, Validators.required],
      isDeleted: [0],
      createdAt: [new Date,],
      modifiedAt: [new Date,]
    })
  }
  createWorkUpdateForm() {
    this.workUpdateForm = this.formBuilder.group({
      id: [0],
      employeeId: [, Validators.required],
      projectId: [, Validators.required],
      workingHours: [8, Validators.required],
      workingDate: [8, Validators.required],
      isDeleted: [0],
      createdAt: [new Date,],
      modifiedAt: [new Date,]
    })
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    $('#addWork').modal('show');
    const date = new Date(selectInfo.start);
    date.setDate(date.getDate() + 1);
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo.start)

    this.createWorkAddForm(date)


    calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }
  handleEventClick(clickInfo: EventClickArg) {
    //$('#detailsWork').modal('show');

    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      var id = clickInfo.event.id
      var newId = +id
      console.log(newId)
      for (let i = 0; i < this.worklists.length; i++) {
        if (this.worklists[i]["id"] == newId) {
          console.log(this.worklists[i]["id"])
          this.selectedEvent.push(this.worklists[i])
        }
      }
      this.deleteWorkList(this.selectedEvent[0])
      this.selectedEvent.pop()
      clickInfo.event.remove();
    }

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
