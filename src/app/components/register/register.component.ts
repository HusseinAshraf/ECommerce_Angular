import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;
  userData: any = null;
  dataUser: any = null;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    },
    { validators: this.confirmPasswordValidator }
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     phone: new FormControl(null),
  //   },
  //   this.confirmPasswordValidator
  // );

  confirmPasswordValidator(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.msgSuccess = true;
          if (res.message == 'success') {
            setTimeout(() => {
              this._Router.navigate(['/login']);
              this._ToastrService.success('Success to register');
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
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
}
