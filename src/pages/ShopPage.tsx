import React, { useState, useEffect, useMemo } from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router";

import ProductCard from "../components/ProductCard";
import CategoriesList from "../components/CategoriesList";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchProducts,
  selectProductsByCategoryAndName,
} from "../redux/slices/productsSlice";
import { selectAllCategories } from "../redux/slices/categoriesSlice";
import { useQuery } from "../hooks";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  searchBar: {
    marginBottom: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

const rowsPerPage = 8;

const ShopPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const history = useHistory();
  const query = useQuery();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const products = useAppSelector((state) =>
    selectProductsByCategoryAndName(state, currentCategory, searchTerm)
  );
  const categories = useAppSelector((state) => selectAllCategories(state));
  const productsLoading = useAppSelector((state) => state.products.isLoading);

  const page = Number(query.get("page")) || 1;
  const pageCount = useMemo(
    () => Math.ceil(products.length / rowsPerPage),
    [products.length]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (page > pageCount) history.push({ pathname: "/", search: `?page=${1}` });
  }, [history, page, pageCount]);

  const setSearch = (value: string) => setSearchTerm(value.toLowerCase());
  const clearSearch = () => setSearchTerm("");

  const setCategory = (id: number | null) => setCurrentCategory(id);

  const setCurrentPage = (_: React.ChangeEvent<unknown>, page: number) =>
    history.push({ pathname: "/", search: `?page=${page}` });

  return (
    <>
      <Loading isLoading={productsLoading} />
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <SearchBar
              placeholder="Поиск"
              value={searchTerm}
              onChange={setSearch}
              onCancelSearch={clearSearch}
              className={classes.searchBar}
            />
            <Grid container spacing={4}>
              {products
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.pagination}
            >
              <Pagination
                page={page}
                count={pageCount}
                color="primary"
                onChange={setCurrentPage}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <CategoriesList
              categories={categories}
              onCategoryPress={setCategory}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ShopPage;
