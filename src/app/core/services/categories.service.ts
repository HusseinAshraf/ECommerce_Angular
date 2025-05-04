import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategories(id:string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
}
