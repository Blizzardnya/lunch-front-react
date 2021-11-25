import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import axios from "../../core/axios";
import { CartItem, UpdateQuantityPayload } from "../../types/cartTypes";
import { selectProductEntities } from "./productsSlice";

const cartAdapter = createEntityAdapter<CartItem>();

const cartInitialState = cartAdapter.getInitialState({
  isLoading: false,
});

export const sendOrder = createAsyncThunk<
  void,
  { showMessage: () => void },
  { state: RootState; rejectValue: any }
>("cart/sendOrder", async (payload, { getState, dispatch }) => {
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
    payload.showMessage();
    dispatch(clearCart());
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
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
    updateItemQuantity(state, action: UpdateQuantityPayload) {
      const { id, quantity } = action.payload;

      cartAdapter.updateOne(state, { id, changes: { quantity } });
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      cartAdapter.removeOne(state, action.payload);
    },
    clearCart(state) {
      cartAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
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

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = actions;

export default reducer;
