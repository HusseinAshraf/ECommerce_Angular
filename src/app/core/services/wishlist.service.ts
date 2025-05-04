import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishListNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
 

  private readonly _HttpClient = inject(HttpClient);

  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      
    );
  }
  getWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`, );
  }
  deleteItemWishList(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`,
     
    );
  }
}
