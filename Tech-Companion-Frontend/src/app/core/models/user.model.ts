export type UserRole = 'user' | 'admin';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  token?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
