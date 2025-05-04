import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css',
})
export class NavAuthComponent implements OnInit {
  private readonly _MyTranslateService = inject(MyTranslateService);

  readonly _TranslateService = inject(TranslateService);

  isDropdownOpen: boolean = false;
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    initFlowbite();
  }

  change(lang: string): void {
    this._MyTranslateService.changeLang(lang);
  }
}
