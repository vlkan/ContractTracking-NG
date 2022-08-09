import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProjectComponent } from './components/project/project.component';
import { WorklistCalendarComponent } from './components/worklist-calendar/worklist-calendar.component';


const routes: Routes = [
  {path: "", pathMatch:"full", component:ProjectComponent},
  {path: "projects", component:ProjectComponent},
  {path: "projects/customer/:customerId", component:ProjectComponent},
  // {path: "payments", component: PaymentComponent },
  // {path: "payments/employee/:employeeId", component:PaymentComponent},
  {path: "invoices", component: InvoiceComponent },
  {path: "invoices/employee/:employeeId", component:InvoiceComponent},
  {path: "worklists", component: WorklistCalendarComponent },
  {path: "employees", component: EmployeeComponent },
  {path: "notifications", component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
