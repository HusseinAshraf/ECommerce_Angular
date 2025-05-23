import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _PlatId = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null , null);

  constructor() {
    if (isPlatformBrowser(this._PlatId)) {
      this._TranslateService.setDefaultLang('en');
      this.setLang();
    }
  }

  setLang(): void {
    let saveLang = localStorage.getItem('lang');
    if (saveLang !== null) {
      this._TranslateService.use(saveLang!);
    }

    if (saveLang === 'en') {
      // document.documentElement.dir = 'ltr';
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');

      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (saveLang === 'ar') {
      // document.documentElement.dir = 'rtl';
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PlatId)) {
      localStorage.setItem('lang', lang);
      this.setLang();
    }
  }
}
