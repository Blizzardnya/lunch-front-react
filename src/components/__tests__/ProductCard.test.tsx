import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import AppWrapper from "../../mocks/AppWrapper";
import ProductCard from "../ProductCard";
import { Product } from "../../types/productTypes";
import { store } from "../../redux/store";

const testProduct: Product = {
  id: 1,
  name: "Test",
  description: "test test",
  category: 1,
  price: 3.5,
};

test("renders correct", () => {
  render(
    <AppWrapper>
      <ProductCard product={testProduct} />
    </AppWrapper>
  );
  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(screen.getByText("Цена: 3.5 р.")).toBeInTheDocument();
  expect(screen.getByText("test test")).toBeInTheDocument();
});

test("Add product to cart", () => {
  render(
    <AppWrapper>
      <ProductCard product={testProduct} />
    </AppWrapper>
  );

  expect(store.getState().cart.ids).toHaveLength(0);
  fireEvent.click(screen.getByText("Добавить"));
  expect(store.getState().cart.ids).toHaveLength(1);
});
