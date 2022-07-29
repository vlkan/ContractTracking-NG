import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { WorklistComponent } from './components/worklist/worklist.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NaviComponent } from './components/navi/navi.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    EmployeeComponent,
    ProjectComponent,
    WorklistComponent,
    NotificationComponent,
    PaymentComponent,
    NaviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
