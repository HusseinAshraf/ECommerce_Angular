import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.msgSuccess = true;
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            localStorage.setItem(
              'user',
              JSON.stringify({
                email: res.user.email,
                name: res.user.name,
                phone: res.user.phone,
                role: res.user.role,
              })
            );
            console.log('user', res.user);
            this._ToastrService.success('Welcome to our website');
            // this._AuthService.saveUserData();
            this._Router.navigate(['/home']);

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
      this.loginForm.setErrors({ mismatch: true });
      this.loginForm.markAllAsTouched();
    }
  }
}
