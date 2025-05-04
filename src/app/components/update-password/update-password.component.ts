import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule , TranslateModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  msgError: string = '';
  isLoading: boolean = false;

  msgSuccess: boolean = false;

  updatePasswordForm: FormGroup = this._FormBuilder.group(
    {
      currentPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
    },
    { validators: this.confirmPasswordValidator }
  );

  confirmPasswordValidator(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  updatePasswordSubmit(): void {
    if (this.updatePasswordForm.valid) {
      this.isLoading = true;
      this._AuthService
        .setUpdatePassword(this.updatePasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.msgSuccess = true;
            if (res.message == 'success') {
              this._AuthService.logOut();
              setTimeout(() => {
                this._ToastrService.success('Password Updated Successfully');
              }, 1000);
              this.isLoading = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            this._ToastrService.error(this.msgError);
            this.isLoading = false;
            console.log(this.msgError);
          },
        });
    } else {
      this.updatePasswordForm.setErrors({ mismatch: true });
      this.updatePasswordForm.markAllAsTouched();
    }
  }
}
