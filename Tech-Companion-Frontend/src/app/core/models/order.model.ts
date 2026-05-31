import { CartItem } from './cart.model';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  _id?: string;
  user?: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
