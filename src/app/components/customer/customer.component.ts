import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  isDelete: string;

  customerAddForm: FormGroup
  customerUpdateForm: FormGroup

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private formBuilder:FormBuilder, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.getCustomers();
    this.createCustomerAddForm();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  addCustomer() {
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({}, this.customerAddForm.value)
      this.customerService.addCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#addCustomerModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  updateCustomer(){
    if(this.customerUpdateForm.valid){
      let customerModel = Object.assign({}, this.customerUpdateForm.value)
      this.customerService.updateCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
        this.ngOnInit()
        $('#updateCustomerModal').modal('hide');
      })
    }else{
      this.toastrService.error("Form Missing", "Warning")
    }
  }
  deleteCustomer(customer: Customer, id: number) {
    if(confirm("Are you sure to delete?")) {
      this.customerService.softDeleteCustomer(id).subscribe(response => {
        this.toastrService.success(response.message, customer.name)
        this.ngOnInit()
        $('#customerDetailModal').modal('hide');
      })
    }
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
  getIsDeletedEnum(type: number) {
    this.isDelete = EnumIsDeleted[type];
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

enum EnumIsDeleted {
  'No' = 0,
  'Yes' = 1,
}

