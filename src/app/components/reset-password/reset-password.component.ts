import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

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
