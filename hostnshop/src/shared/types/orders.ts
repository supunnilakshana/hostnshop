export interface User {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  }
  
  export interface OrderItem {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  }
  
  export type OrderStatus = 'Paid' | 'Delivered' | 'Completed' | 'Pending';
  
  export interface Order {
    id: string;
    customer: User;
    status: OrderStatus;
    total: number;
    date: string;
    items: OrderItem[];
  }