import React from "react";
import { render, screen } from "@testing-library/react";

import CategoriesList from "../CategoriesList";

test("renders categories", () => {
  const categories = [
    { id: 1, name: "Button 1" },
    { id: 2, name: "Button 2" },
  ];

  render(<CategoriesList categories={categories} onCategoryPress={() => {}} />);

  expect(screen.getByText("Категории")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});
