import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  currentCustomer: Customer;
  customerType: string;
  constructor(private customerService: CustomerService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response);
    });
  }
  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe()
  }
  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(response => {
      this.toastrService.success(response.message, customer.name)
    })
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
  }
  getCurrentCustomerClass(customer: Customer) {
    if (customer == this.currentCustomer) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllCustomerClass() {
    if (!this.currentCustomer) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCustomerTypeEnum(type: number) {
    this.customerType = CustomerType[type];
  }
}
enum CustomerType {
  'Individual' = 1,
  'Corporate' = 2,
}
