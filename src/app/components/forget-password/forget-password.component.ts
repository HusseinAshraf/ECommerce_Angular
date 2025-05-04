import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  step: number = 1;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  forgetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  forgetPasswordSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      this._AuthService
        .setForgetPasswordForm(this.forgetPasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.msgSuccess = true;
            if (res.statusMsg == 'success') {
              setTimeout(() => {
                this.step = 2;
                ;
              }, 1000);
              this.isLoading = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            this.isLoading = false;
            console.log(this.msgError);
          },
        });
    } else {
      this.forgetPasswordForm.setErrors({ mismatch: true });
      this.forgetPasswordForm.markAllAsTouched();
    }
  }

  verifyCodeSubmit(): void {
    const emailValue = this.forgetPasswordForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(emailValue);
    if (this.verifyCodeForm.valid) {
      this.isLoading = true;

      const formValue = {
        ...this.verifyCodeForm.value,
        resetCode: String(this.verifyCodeForm.value.resetCode),
      };

      this._AuthService.setResetCodeForm(formValue).subscribe({
        next: (res) => {
          console.log(res);
          this.msgSuccess = true;
          if (res.status == 'Success') {
            setTimeout(() => {

              // this._Router.navigate(['/resetPassword']);
              this.step = 3;
            }, 1000);
            this.isLoading = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
          console.log(this.msgError);
        },
      });
    } else {
      this.verifyCodeForm.setErrors({ mismatch: true });
      this.verifyCodeForm.markAllAsTouched();
    }
  }

  resetPasswordSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      this._AuthService
        .setResetPasswordForm(this.resetPasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.msgSuccess = true;
            if (res.token) {
              setTimeout(() => {
                localStorage.setItem('userToken', res.token);
                this._AuthService.saveUserData();
                this._Router.navigate(['/login']);
                
              }, 1000);
              this.isLoading = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            this.isLoading = false;
            console.log(this.msgError);
          },
        });
    } else {
      this.resetPasswordForm.setErrors({ mismatch: true });
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
