import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { SliderCategoryComponent } from "../slider-category/slider-category.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, SliderCategoryComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
