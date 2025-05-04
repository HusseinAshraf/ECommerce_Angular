import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-slider-category',
  standalone: true,
  imports: [CarouselModule , TranslateModule],
  templateUrl: './slider-category.component.html',
  styleUrl: './slider-category.component.css',
})
export class SliderCategoryComponent implements OnInit {
  customOptionsCategory: OwlOptions = {
    loop: true,
    rtl:true,
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
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: ICategory[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
