import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { Category } from "../../types/categoriesTypes";
import { RootState } from "../store";
import { fetchProducts } from "./productsSlice";

const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = categoriesAdapter.getInitialState();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      categoriesAdapter.setAll(state, action.payload.categories);
    });
  },
});

export const {
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectTotalCategories,
} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);

const { reducer } = categoriesSlice;

export default reducer;
