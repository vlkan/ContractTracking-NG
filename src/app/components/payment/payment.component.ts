import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = []
  currentPayment: Payment;
  dataLoaded = false;
  filterText = '';
  constructor(private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['employeeId']) {
        this.getPaymentsByEmployee(params['employeeId']);
      } else {
        this.getPayments()
      }
    });
    //this.createProjectAddForm();
  }
  getPayments() {
    this.paymentService.getPayments().subscribe((response) => {
      this.payments = response.data;
      this.dataLoaded = true;
    });
  }
  getPaymentsByEmployee(employeeId: number) {
    this.paymentService
      .getPaymentsByEmployee(employeeId)
      .subscribe((response) => {
        this.payments = response.data;
        this.dataLoaded = true;
      });
  }
  setCurrentPayment(payment: Payment) {
    this.currentPayment = payment;
    console.log(payment);
    //this.createProjectUpdateForm();
  }
}
