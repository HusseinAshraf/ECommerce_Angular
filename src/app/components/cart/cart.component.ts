import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import {  CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink , TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartDetails: ICart  = {} as ICart ;

  ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.deleteSpecificCart(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;

        this._ToastrService.success('Item removed from cart');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this._CartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this._ToastrService.success('Update Cart Success');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart(): void {
    this._CartService.deleteAllCart().subscribe({
      next: (res) => {
        console.log(res.data);
        if (res.message === 'success') {
          this.cartDetails = {} as ICart;
          this._ToastrService.success('Remove Cart Success');
          this._CartService.cartNumber.next(0);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
