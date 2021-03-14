import { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

export type UpdateQuantityPayload = PayloadAction<{
  id: number;
  quantity: number;
}>;
