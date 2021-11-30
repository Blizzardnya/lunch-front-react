import React, { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectProductsInCart,
  removeItemFromCart,
  calcCartTotal,
  clearCart,
  sendOrder,
  updateItemQuantity,
} from "../redux/slices/cartSlice";
import GreenButton from "../components/Buttons/GreenButton";
import Loading from "../components/Loading";

const PREFIX = "CartPage";

const classes = {
  table: `${PREFIX}-table`,
  container: `${PREFIX}-container`,
  paper: `${PREFIX}-paper`,
  confirmButton: `${PREFIX}-confirmButton`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.table}`]: {
    minWidth: 650,
  },

  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(8),
  },

  [`& .${classes.paper}`]: {
    display: "flex",
    marginTop: theme.spacing(1),
    justifyContent: "center",
  },

  [`& .${classes.confirmButton}`]: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const cartItems = useAppSelector((state) => selectProductsInCart(state));
  const cartTotal = useAppSelector((state) => calcCartTotal(state));
  const isOrderSending = useAppSelector((state) => state.cart.isLoading);

  const showSuccessMessage = () => {
    enqueueSnackbar("Заказ оформлен.", {
      variant: "success",
    });
  };

  const quantityChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const newQuantity = Number(e.target.value);
    if (1 <= newQuantity && newQuantity <= 20) {
      dispatch(
        updateItemQuantity({
          id,
          quantity: Number(e.target.value),
        })
      );
    }
  };

  return (
    <Root>
      <Loading isLoading={isOrderSending} />
      <Container className={classes.container} maxWidth="xl">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Наименование</TableCell>
                <TableCell align="right">Цена, р.</TableCell>
                <TableCell align="right">Количество, шт.</TableCell>
                <TableCell align="right">Сумма, р.</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(clearCart())}
                  >
                    Очистить корзину
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <TextField
                      id="quantity"
                      type="number"
                      size="small"
                      margin="dense"
                      variant="outlined"
                      inputProps={{ min: 1, max: 20 }}
                      onChange={(e) => quantityChange(e, item.id)}
                      value={item.quantity}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="right">Итого: </TableCell>
                <TableCell align="right"> {cartTotal.toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.paper}>
          <GreenButton
            disabled={!loggedIn}
            className={classes.confirmButton}
            onClick={() =>
              dispatch(sendOrder({ showMessage: showSuccessMessage }))
            }
            size="large"
          >
            {loggedIn ? "Оформить заказ" : "Войдите в аккаунт"}
          </GreenButton>
        </div>
      </Container>
    </Root>
  );
};

export default CartPage;
