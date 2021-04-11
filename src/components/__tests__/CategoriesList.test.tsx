import React from "react";
import { render } from "@testing-library/react";
import CategoriesList from "../CategoriesList";

test("renders categories", () => {
  const categories = [
    { id: 1, name: "Button 1" },
    { id: 2, name: "Button 2" },
  ];

  const { getByText, getAllByRole } = render(
    <CategoriesList categories={categories} onCategoryPress={() => {}} />
  );

  const headerElement = getByText(/Категории/i);
  const buttons = getAllByRole("button");
  expect(headerElement).toBeInTheDocument();
  expect(buttons.length).toEqual(3);
});
