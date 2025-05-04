import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { initFlowbite } from 'flowbite';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  customOptionsProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  detailsProduct: Iproduct | null = null;

  images: string[] = [];
  ngOnInit(): void {
    initFlowbite();

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));

        let idProduct = p.get('id');
        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            this.detailsProduct = res.data;
            this.images = res.data.images;
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
