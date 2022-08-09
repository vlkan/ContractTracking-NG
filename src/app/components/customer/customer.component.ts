import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

declare var $ : any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  currentCustomer: Customer
  customerType: string;

  customerAddForm: FormGroup
  customerUpdateForm: FormGroup

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private formBuilder:FormBuilder) {}

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
  addCustomer() {
    console.log(this.customerAddForm.value)
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({}, this.customerAddForm.value)
      this.customerService.addCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
      $('#addCustomerModal').modal('hide');
      setTimeout(()=>{
        this.ngOnInit()
      },200)
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  updateCustomer(){
    console.log(this.customerUpdateForm.value)
    if(this.customerUpdateForm.valid){
      let customerModel = Object.assign({}, this.customerUpdateForm.value)
      this.customerService.updateCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      })
      $('#updateCustomerModal').modal('hide');
      setTimeout(()=>{
        this.ngOnInit()
      },200)
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(response => {
      this.toastrService.success(response.message, customer.name)
    })
    $('#customerDetailModal').modal('hide');
    setTimeout(()=>{
      this.ngOnInit()
    },200)
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
    this.createCustomerUpdateForm()
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
      id:[0],
      name:["", Validators.required],
      email:["", Validators.required],
      description:["", Validators.required],
      type:[, Validators.required],
      phone:["", Validators.required],
      isDeleted:[0],
      createdAt:[new Date,],
      modifiedAt:[new Date,]
    })
  }
  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      id:[this.currentCustomer.id],
      name:["", Validators.required],
      email:["", Validators.required],
      description:["", Validators.required],
      type:[, Validators.required],
      phone:["", Validators.required],
      isDeleted:[0],
      createdAt:[this.currentCustomer.createdAt,],
      modifiedAt:[new Date,]
    })
  }
}
enum CustomerType {
  'Individual' = 1,
  'Corporate' = 2,
}
