import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
    FormsModule,
    CurrencyPipe,
    SearchPipe,
    TermtextPipe,
    TranslateModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  productsList: Iproduct[] = [];
  text: string = '';

  wishlist: string[] = [];

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        const newDate = res.data.map((item: any) => item._id);
        this.wishlist = newDate;
        this._WishlistService.wishListNumber.next(res.data.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToWishlist(id: string): void {
    this._WishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this._ToastrService.success(res.message);
        this._WishlistService.wishListNumber.next(res.data.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromWishlist(id: string): void {
    this._WishlistService.deleteItemWishList(id).subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this._ToastrService.warning(res.message);
        this._WishlistService.wishListNumber.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
