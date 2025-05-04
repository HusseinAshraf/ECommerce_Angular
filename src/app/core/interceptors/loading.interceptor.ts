import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const _NgxSpinnerService = inject(NgxSpinnerService);

  _NgxSpinnerService.show();

  return next(req).pipe(
    
    finalize(

    () => {
      console.log('HIDE SPINNER', req.url);
      _NgxSpinnerService.hide();
    }

  ));
};
