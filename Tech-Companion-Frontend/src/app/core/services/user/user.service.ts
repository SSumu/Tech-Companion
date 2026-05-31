import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getProfile(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.USERS}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.USERS}/profile`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.USERS}/change-password`, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.USERS}/delete-account`);
  }
}
