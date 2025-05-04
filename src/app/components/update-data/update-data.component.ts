import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [ReactiveFormsModule , TranslateModule],
  templateUrl: './update-data.component.html',
  styleUrl: './update-data.component.css',
})
export class UpdateDataComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  msgError: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.updateDataForm.patchValue({
      name: this._AuthService.dataUser.name,
      email: this._AuthService.dataUser.email,
      phone: this._AuthService.dataUser.phone,
    });
  }

  updateDataForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  userData: any = null;
  dataUser: any = null;

  updateDataSubmit(): void {
    if (this.updateDataForm.valid) {
      this.isLoading = true;
      this._AuthService.setUpdateData(this.updateDataForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this._AuthService.userData = res.data;
            this.isLoading = false;
            this._ToastrService.success('Data Updated Successfully');
            this._AuthService.logOut();
          }
        },
        error: (err) => {
          this.msgError = err.error.message;
          this._ToastrService.error(this.msgError);
          console.log(this.msgError);
          this.isLoading = false;
        },
      });
    }
  }
}
