export interface Product {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  availability: 'In Stock' | 'Out of Stock' | 'Coming Soon' | 'Pre Order';
}
