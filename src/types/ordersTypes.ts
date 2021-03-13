import { Product } from "./productTypes";

export interface Order {
  id: number;
  created: string;
  get_total_cost: number;
  status: string;
  order_items: [
    { product: Product; quantity: number; get_cost: number; price: number }
  ];
}

export interface OrdersInitialState {
  orders: Order[];
  isLoading: boolean;
}
