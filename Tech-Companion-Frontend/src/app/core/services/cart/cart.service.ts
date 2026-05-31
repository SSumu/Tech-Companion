import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  getCart(): Observable<any> {
    return this.http.get(API_ENDPOINTS.CART);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.CART}/addToCart`, { productId, quantity });
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.CART}/updateCartItem`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.CART}/removeCartItem/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.CART}/clearCart`);
  }
}
