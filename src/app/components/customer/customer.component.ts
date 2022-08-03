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

  customerAddForm: FormGroup

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCustomers();
    this.createCustomerAddForm();
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
  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      id:["0"],
      name:["", Validators.required],
      email:["", Validators.required],
      description:["", Validators.required],
      type:["", Validators.required],
      phone:["", Validators.required],
      isDeleted:["0"],
      createdAt:[""],
      modifiedAt:[new Date,]
    })
  }
}
enum CustomerType {
  'Individual' = 1,
  'Corporate' = 2,
}
