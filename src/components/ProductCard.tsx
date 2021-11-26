import React from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useSnackbar } from "notistack";

import GreenButton from "./Buttons/GreenButton";
import { Product } from "../types/productTypes";
import { useAppDispatch } from "../redux/hooks";
import { addItemToCart } from "../redux/slices/cartSlice";
import { truncDescription } from "../utils/text";

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
  divider: {
    margin: theme.spacing(2),
  },
}));

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addItemToCartF = () => {
    const { id, price } = product;

    dispatch(addItemToCart({ id, price, quantity: 1 }));
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
        <Typography variant="h5">Цена: {product.price} р.</Typography>
        <Divider className={classes.divider} variant="middle" />
        <Typography color="textSecondary" variant="body1">
          {truncDescription(product.description, 70)}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <GreenButton
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={addItemToCartF}
        >
          Добавить
        </GreenButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
