import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
// import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);

  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _MyTranslateService = inject(MyTranslateService);

  readonly _TranslateService = inject(TranslateService);

  isDropdownOpen: boolean = false;
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  userData: any = null;

  countCart: number = 0;
  countWishlist: number = 0;

  ngOnInit(): void {
    if (this._AuthService) {
      this._AuthService.saveUserData();
      this.userData = this._AuthService.userData;
    }
    initFlowbite();
    this._CartService.getProductCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        this._WishlistService.wishListNumber.next(res.data.length);
      },
    });

    this._CartService.cartNumber.subscribe({
      next: (res) => {
        this.countCart = res;
      },
    });

    this._WishlistService.wishListNumber.subscribe({
      next: (res) => {
        this.countWishlist = res;
      },
    });
  }

  change(lang: string): void {
    this._MyTranslateService.changeLang(lang);
  }
}
