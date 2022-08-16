import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NaviComponent } from './components/navi/navi.component';
import { WorklistCalendarComponent } from './components/worklist-calendar/worklist-calendar.component';
import { WorklistListComponent } from './components/worklist-list/worklist-list.component';

import { HttpClientModule } from '@angular/common/http';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FilterPaymentPipe } from './pipes/filter-payment.pipe';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FilterInvoicePipe } from './pipes/filter-invoice.pipe';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerPipe } from './pipes/customer.pipe';
import { BudgetComponent } from './components/budget/budget.component';
import { BudgetPipe } from './pipes/budget.pipe';
import { ProjectPipe } from './pipes/project.pipe';
import { EmployeePipe } from './pipes/employee.pipe';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { AddcpComponent } from './components/addcp/addcp.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { AddprojectComponent } from './components/addproject/addproject.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    EmployeeComponent,
    ProjectComponent,
    NotificationComponent,
    PaymentComponent,
    NaviComponent,
    VatAddedPipe,
    FilterPipePipe,
    FilterPaymentPipe,
    WorklistCalendarComponent,
    WorklistListComponent,
    InvoiceComponent,
    FilterInvoicePipe,
    CustomerDetailComponent,
    CustomerPipe,
    BudgetComponent,
    BudgetPipe,
    ProjectPipe,
    EmployeePipe,
    CustomerAddComponent,
    AddcpComponent,
    AddcustomerComponent,
    AddprojectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
