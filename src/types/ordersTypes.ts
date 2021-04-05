import { Product } from "./productTypes";

export enum OrderStatus {
  N = "N",
  P = "P",
  C = "C",
}

interface OrderItem {
  product: Product;
  quantity: number;
  get_cost: number;
  price: number;
}

export interface Order {
  id: number;
  created: string;
  get_total_cost: number;
  status: OrderStatus;
  order_items: OrderItem[];
}

export interface OrdersInitialState {
  orders: Order[];
  isLoading: boolean;
}
