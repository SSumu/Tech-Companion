import { CartItem } from './cart.model';

export interface Order {
  _id?: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
}
