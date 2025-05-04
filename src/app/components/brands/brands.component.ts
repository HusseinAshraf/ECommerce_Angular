import { IBrands } from './../../core/interfaces/ibrands';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);
  brandsList: IBrands[] = [];

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        
        this.brandsList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
