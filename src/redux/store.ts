import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountReducer from "./slices/accountSlice";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";
import encryptor from "./encryptor";

const rootReducer = combineReducers({
  account: accountReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: "lunch",
  storage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["account", "products", "categories", "cart", "orders"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
  transforms: [encryptor],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export { store, persistor };
