import { configureStore, combineReducers } from "@reduxjs/toolkit";

import accountReducer from "../slices/accountSlice";
import productsReducer from "../slices/productsSlice";
import categoriesReducer from "../slices/categoriesSlice";
import cartReducer from "../slices/cartSlice";
import ordersReducer from "../slices/ordersSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

// Redux: Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export { store };
