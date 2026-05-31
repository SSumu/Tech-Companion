import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getDashboardStats(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.ADMIN}/dashboard`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ENDPOINTS.ADMIN}/users`);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ENDPOINTS.ORDERS}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, { status });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.ADMIN}/users/${userId}`);
  }
}
