import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  headers: any = { token: localStorage.getItem('userToken') };
  private readonly _HttpClient = inject(HttpClient);

  CheckOut(idCart: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServal}`,
      {
        shippingAddress: shippingDetails,
      },
      {
        headers: this.headers,
      }
    );
  }
  cashOut(idCart: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/${idCart}`,
      {
        shippingAddress: shippingDetails,
      },
      {
        headers: this.headers,
      }
    );
  }

  getOrders(id: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${id}`
    );
  }
}
