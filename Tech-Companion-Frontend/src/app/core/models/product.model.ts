export type ProductAvailability = 'In Stock' | 'Out of Stock' | 'Coming Soon' | 'Pre Order';

export interface Product {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  availability: ProductAvailability;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
