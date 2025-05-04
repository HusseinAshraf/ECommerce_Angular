import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  verifyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  verifyCodeSubmit(): void {
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
              this._Router.navigate(['/resetPassword']);
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
}
