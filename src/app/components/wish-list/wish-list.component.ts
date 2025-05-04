import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe, TranslateModule, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);

  wishlistDetails: IWishlist[] = [];

  ngOnInit(): void {
    this.getAllWishList();
  }

  getAllWishList(): void {
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.wishlistDetails = res.data;
        } else {
          this._ToastrService.error('No data available');
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
        this._ToastrService.error('Failed to load wishlist');
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success(res.message);
        this.removeItem(id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeItem(id: string): void {
    this._WishlistService.deleteItemWishList(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.getAllWishList();

          // this.wishlistDetails = res.data;
          // this._ToastrService.error(res.message);
          this._WishlistService.wishListNumber.next(res.data.length);
        }
      },
      error: (err) => {
        console.error('Error removing wishlist item:', err);
        this._ToastrService.error('Failed to remove wishlist item');
      },
    });
  }
}
