import React from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useSnackbar } from "notistack";

import GreenButton from "./Buttons/GreenButton";
import { Product } from "../types/productTypes";
import { useAppDispatch } from "../redux/hooks";
import { addItemToCart } from "../redux/slices/cartSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardActions: {
    justifyContent: "center",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const truncDescription = (text: string, length: number) => {
    const clamp = "...";
    return text.length > length ? text.slice(0, length) + clamp : text;
  };

  const addItemToCartF = (p: Product) => {
    dispatch(addItemToCart({ id: p.id, price: p.price, quantity: 1 }));
    enqueueSnackbar("Товар добавлен в корзину.", {
      variant: "success",
    });
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body1">
          {truncDescription(product.description, 70)}
        </Typography>
        <Typography variant="h5">Цена: {product.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <GreenButton
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => addItemToCartF(product)}
        >
          Добавить
        </GreenButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
