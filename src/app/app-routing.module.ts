import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcpComponent } from './components/addcp/addcp.component';
import { BudgetComponent } from './components/budget/budget.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProjectComponent } from './components/project/project.component';
import { WorklistCalendarComponent } from './components/worklist-calendar/worklist-calendar.component';


const routes: Routes = [
  {path: "", pathMatch:"full", component:ProjectComponent},
  {path: "projects", component:ProjectComponent},
  {path: "projects/search/:searchText", component:ProjectComponent},
  {path: "projects/customer/:customerId", component:ProjectComponent},
  // {path: "payments", component: PaymentComponent },
  // {path: "payments/employee/:employeeId", component:PaymentComponent},
  {path: "invoices", component: InvoiceComponent },
  {path: "invoices/search/:start/:end", component:InvoiceComponent},
  {path: "worklists", component: WorklistCalendarComponent },
  {path: "employees", component: EmployeeComponent },
  {path: "employees/search/:searchName", component: EmployeeComponent },
  {path: "notifications", component: NotificationComponent },
  {path: "customers", component: CustomerDetailComponent },
  {path: "customers/search/:searchName", component: CustomerDetailComponent },
  //{path: "customer-add", component: CustomerAddComponent },
  {path: "budgets", component: BudgetComponent },
  {path: "addcp", component: AddcpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
