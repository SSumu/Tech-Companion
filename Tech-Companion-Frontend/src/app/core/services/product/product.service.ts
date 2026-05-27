import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_ENDPOINTS.PRODUCTS);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_ENDPOINTS.PRODUCTS, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  }
}
