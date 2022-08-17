import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  customerAddForm:FormGroup
  constructor(private customerService: CustomerService, private formBuilder:FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCustomerAddForm()
  }
  addCustomer(){
    console.log(this.customerAddForm.value)
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({}, this.customerAddForm.value)
      this.customerService.addCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
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
