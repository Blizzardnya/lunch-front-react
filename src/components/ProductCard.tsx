import React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSnackbar } from "notistack";

import GreenButton from "./Buttons/GreenButton";
import { Product } from "../types/productTypes";
import { useAppDispatch } from "../redux/hooks";
import { addItemToCart } from "../redux/slices/cartSlice";
import { truncDescription } from "../utils/text";

const PREFIX = "ProductCard";

const classes = {
  card: `${PREFIX}-card`,
  cardActions: `${PREFIX}-cardActions`,
  cardContent: `${PREFIX}-cardContent`,
  divider: `${PREFIX}-divider`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  [`& .${classes.cardActions}`]: {
    justifyContent: "center",
  },

  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
  },

  [`& .${classes.divider}`]: {
    margin: theme.spacing(2),
  },
}));

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addItemToCartWrapper = () => {
    const { id, price } = product;

    dispatch(addItemToCart({ id, price, quantity: 1 }));
    enqueueSnackbar("Товар добавлен в корзину.", {
      variant: "success",
    });
  };

  return (
    <StyledCard variant="outlined" className={classes.card}>
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
          onClick={addItemToCartWrapper}
        >
          Добавить
        </GreenButton>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;
