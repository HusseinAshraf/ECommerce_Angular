import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = null;
  headers: any = { token: localStorage.getItem('userToken') };
  dataUser: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  setForgetPasswordForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setResetCodeForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setResetPasswordForm(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
  setUpdateData(data: string): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/users/updateMe/`,
      data,
      {
        headers: this.headers,
      }
    );
  }
  setUpdatePassword(data: any): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/users/changeMyPassword`,
      data,
      {
        headers: this.headers,
      }
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      this.dataUser = JSON.parse(localStorage.getItem('user')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this._Router.navigate(['/login']);
  }
}
