import React, { useState, useEffect } from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

import ProductCard from "../components/ProductCard";
import CategoriesList from "../components/CategoriesList";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchProducts,
  selectProductsByCategory,
} from "../redux/slices/productsSlice";
import { selectAllCategories } from "../redux/slices/categoriesSlice";
import { Product } from "../types/productTypes";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const ShopPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const products = useAppSelector((state) =>
    selectProductsByCategory(state, currentCategory)
  );
  const categories = useAppSelector((state) => selectAllCategories(state));
  const productsLoading = useAppSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = (): Product[] => {
    return searchTerm
      ? products.filter((item) => item.name.toLowerCase().includes(searchTerm))
      : products;
  };

  return (
    <>
      <Loading isLoading={productsLoading} />
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <SearchBar
              placeholder="Поиск"
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value.toLowerCase())}
              onCancelSearch={() => setSearchTerm("")}
              style={{
                marginBottom: 10,
              }}
            />
            <Grid container spacing={4}>
              {filterProducts().map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <CategoriesList
              categories={categories}
              onCategoryPress={(id) => setCurrentCategory(id)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ShopPage;
