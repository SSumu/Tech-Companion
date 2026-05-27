import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cart$ = this.cartItems.asObservable();

  addToCart(product: Product): void {
    const items = this.cartItems.value;
    items.push(product);
    this.cartItems.next(items);
  }

  removeFromCart(index: number): void {
    const items = this.cartItems.value;
    items.splice(index, 1);
    this.cartItems.next(items);
  }
}
