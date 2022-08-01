import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  currentCustomer: Customer;
  customerType: string;
  constructor(private customerService: CustomerService) {}

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
      console.log(response.message)
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
  getEnum(type: number) {
    this.customerType = CustomerType[type];
  }
}
enum CustomerType {
  'Individual' = 1,
  'Corporate' = 2,
}
