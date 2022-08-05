import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProjectComponent } from './components/project/project.component';
import { WorklistComponent } from './components/worklist/worklist.component';

const routes: Routes = [
  {path: "", pathMatch:"full", component:ProjectComponent},
  {path: "projects", component:ProjectComponent},
  {path: "projects/customer/:customerId", component:ProjectComponent},
  {path: "payments", component: PaymentComponent },
  {path: "payments/employee/:employeeId", component:PaymentComponent},
  {path: "worklists", component: WorklistComponent },
  //{path: "employees", component: EmployeeComponent },
  {path: "notifications", component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
