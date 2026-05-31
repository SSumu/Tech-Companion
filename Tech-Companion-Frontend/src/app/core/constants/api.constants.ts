import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  AUTH: `${environment.apiUrl}/auth`,
  PRODUCTS: `${environment.apiUrl}/products`,
  CART: `${environment.apiUrl}/cart`,
  ORDERS: `${environment.apiUrl}/orders`,
  USERS: `${environment.apiUrl}/users`,
  ADMIN: `${environment.apiUrl}/admin`,
  ANALYTICS: `${environment.apiUrl}/analytics`,
};
