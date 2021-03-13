import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Order, OrdersInitialState } from "../../types/ordersTypes";
import { RootState } from "../store";
import axios from "../../core/axios";

const initialState: OrdersInitialState = {
  orders: [],
  isLoading: false,
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
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      });
  },
});

const { reducer } = ordersSlice;

export default reducer;
