import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import axios from "../../core/axios";
import history from "../../core/history";
import { CartItem } from "../../types/cartTypes";
import { selectProductEntities } from "./productsSlice";

const cartAdapter = createEntityAdapter<CartItem>();

export const sendOrder = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: any }
>("cart/sendOrder", async (_, { getState, dispatch }) => {
  const data = {
    user: getState().account.username,
    products: selectAllCartItems(getState()).map((item) => {
      return { id: item.id, quantity: item.quantity };
    }),
  };

  const response = await axios.post("api/v1/orders/order", data, {
    headers: { Authorization: "Token " + getState().account.token },
  });

  if (response.status === 201) {
    dispatch(clearCart());
    history.push("/account");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const { id, quantity } = action.payload;
      const item = state.entities[id];

      if (item) {
        item.quantity += quantity;
      } else {
        cartAdapter.addOne(state, action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      cartAdapter.removeOne(state, action.payload);
    },
    clearCart(state) {
      cartAdapter.removeAll(state);
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(login.pending, (state) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(login.rejected, (state) => {
  //         state.isLoading = false;
  //       })
  //       .addCase(login.fulfilled, (state, action) => {
  //         state.loggedIn = true;
  //         state.token = action.payload.data.id;
  //         state.isLoading = false;
  //       });
  //   },
});

const { actions, reducer } = cartSlice;

export const {
  selectById: selectCartItemById,
  selectIds: selectCartIds,
  selectEntities: selectCartEntities,
  selectAll: selectAllCartItems,
  selectTotal: selectTotalCartItems,
} = cartAdapter.getSelectors<RootState>((state) => state.cart);

export const selectProductsInCart = createSelector(
  selectAllCartItems,
  selectProductEntities,
  (cartItems, products) =>
    cartItems.map((item) => {
      const product = products[item.id];
      return { ...item, name: product?.name };
    })
);

export const calcCartTotal = createSelector(selectAllCartItems, (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const { addItemToCart, removeItemFromCart, clearCart } = actions;

export default reducer;
