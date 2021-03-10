import { Category } from "./categoriesTypes";

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Category;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
}
