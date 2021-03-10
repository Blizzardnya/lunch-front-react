import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectProductsInCart,
  removeItemFromCart,
  calcCartTotal,
  clearCart,
  sendOrder,
} from "../redux/slices/cartSlice";
import GreenButton from "../components/Buttons/GreenButton";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    paddingTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    marginTop: theme.spacing(1),
    justifyContent: "center",
  },
  confirmButton: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

const CartPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => selectProductsInCart(state));
  const cartTotal = useAppSelector((state) => calcCartTotal(state));

  return (
    <Container className={classes.container} maxWidth="xl">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Сумма</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="secondary"
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
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
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
          className={classes.confirmButton}
          onClick={() => dispatch(sendOrder())}
          size="large"
        >
          Оформить заказ
        </GreenButton>
      </div>
    </Container>
  );
};

export default CartPage;
