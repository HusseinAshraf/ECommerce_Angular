import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
  customOptionsMain: OwlOptions = {
      loop: true,
      rtl:true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      autoplay: true,
      autoplayTimeout:2000,
      autoplayHoverPause: true,
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
      
    };

}
