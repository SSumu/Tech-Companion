import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  createOrder(orderDate: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.ORDERS, orderDate);
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ENDPOINTS.ORDERS}/my-orders`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.ORDERS}/${id}`);
  }

  cancelOrder(id: string): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.ORDERS}/${id}/cancel`, {});
  }
}
