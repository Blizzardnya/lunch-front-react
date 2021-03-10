import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

import { Product } from "../../types/productTypes";
import { Category } from "../../types/categoriesTypes";
import { RootState } from "../store";
import axios from "../../core/axios";

// Define normalizr entity schemas
const categoryEntity = new schema.Entity("categories");
const productEntity = new schema.Entity(
  "products",
  {
    category: categoryEntity,
  },
  {
    processStrategy: (entity) => {
      return { ...entity, price: Number(entity.price) };
    },
  }
);

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState();

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, _thunkAPI) => {
    const response = await axios.get("api/v1/cafe/product");
    const normalized = normalize<
      any,
      {
        products: { [key: string]: Product };
        categories: { [key: string]: Category };
      }
    >(response.data.data.products, [productEntity]);

    return normalized.entities;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload.products);
    });
  },
});

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

export const selectProductsByCategory = createSelector(
  selectAllProducts,
  (_: any, category: number | null) => category,
  (products, category) => {
    if (!category) {
      return products;
    } else {
      return products.filter((item) => item.category === category);
    }
  }
);

const { reducer } = productsSlice;

export default reducer;
