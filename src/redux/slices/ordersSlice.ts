import {
  createSlice,
  createAsyncThunk,
  //   createSelector,
} from "@reduxjs/toolkit";

import { Order, OrdersInitialState } from "../../types/ordersTypes";
import { RootState } from "../store";
import axios from "../../core/axios";

const initialState: OrdersInitialState = {
  orders: [],
};

export const fetchOrders = createAsyncThunk<
  { orders: Order[] },
  void,
  { state: RootState; rejectValue: any }
>("orders/fetchOrders", async (_, { getState }) => {
  const { token, username } = getState().account;
  const response = await axios.get("api/v1/orders/order", {
    headers: { Authorization: "Token " + token },
    params: { username },
  });

  return response.data.data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
    });
  },
});

// export const selectProductsByCategory = createSelector(
//   selectAllProducts,
//   (_: any, category: number | null) => category,
//   (products, category) => {
//     if (!category) {
//       return products;
//     } else {
//       return products.filter((item) => item.category === category);
//     }
//   }
// );

const { reducer } = ordersSlice;

export default reducer;
