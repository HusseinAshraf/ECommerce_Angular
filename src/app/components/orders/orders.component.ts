import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
    private readonly _Router = inject(Router);
  

  cartId: string | null = '';
  

  togglePaymentMethod(method: 'visa' | 'cash'): void {
    this.selectedPaymentMethod = method;
  }

  selectedPaymentMethod: 'visa' | 'cash' = 'visa';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  orders: FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    city: [null, Validators.required],
  });

  orderSubmit(): void {
    console.log(this.orders.value);
    this._OrdersService.CheckOut(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
          this._ToastrService.success('Order placed successfully');
        }
      },
      error: (err) => {
        console.log('err:', err);
      },
    });
  }

  cashSubmit(): void {
    console.log(this.orders.value);

    this._OrdersService.cashOut(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this._ToastrService.success('Order placed successfully');
          this._CartService.cartNumber.next(0);
          this._Router.navigate(['/allorders']);


        }
      },
      error: (err) => {
        console.log('err:', err);
      },
    });


}

}
