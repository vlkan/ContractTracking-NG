import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customers: Customer[] = [];
  customerType: string;
  isDelete: string;
  customerAddForm: FormGroup

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  addCustomer() {
    console.log(this.customerAddForm.value)
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

}
