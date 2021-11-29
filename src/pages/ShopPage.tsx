import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import CategoriesList from "../components/CategoriesList";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchProducts,
  selectProductsByCategoryAndName,
} from "../redux/slices/productsSlice";
import { selectAllCategories } from "../redux/slices/categoriesSlice";

const PREFIX = "ShopPage";

const classes = {
  cardGrid: `${PREFIX}-cardGrid`,
  searchBar: `${PREFIX}-searchBar`,
  pagination: `${PREFIX}-pagination`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.searchBar}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.pagination}`]: {
    marginTop: theme.spacing(2),
  },
}));

const rowsPerPage = 8;

const ShopPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const products = useAppSelector((state) =>
    selectProductsByCategoryAndName(state, currentCategory, searchTerm)
  );
  const categories = useAppSelector((state) => selectAllCategories(state));
  const productsLoading = useAppSelector((state) => state.products.isLoading);

  const page = Number(searchParams.get("page")) || 1;
  const pageCount = useMemo(
    () => Math.ceil(products.length / rowsPerPage),
    [products.length]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (page > pageCount) setSearchParams({ page: "1" });
  }, [setSearchParams, page, pageCount]);

  const setSearch = (event: any) =>
    setSearchTerm(event.target.value.toLowerCase());

  const setCategory = (id: number | null) => setCurrentCategory(id);

  const setCurrentPage = (_: React.ChangeEvent<unknown>, page: number) =>
    setSearchParams({ page: page.toString() });

  return (
    <Root>
      <Loading isLoading={productsLoading} />
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <TextField
              fullWidth
              label="Поиск..."
              value={searchTerm}
              onChange={setSearch}
              sx={{ marginBottom: 2, backgroundColor: "white" }}
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
    </Root>
  );
};

export default ShopPage;
