import React, { useEffect } from "react";
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
} from "@material-ui/core";

import OrderRow from "../components/OrderRow";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchOrders } from "../redux/slices/ordersSlice";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    paddingTop: theme.spacing(8),
  },
}));

const AccountPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Container className={classes.container} maxWidth="xl">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Номер</TableCell>
              <TableCell align="right">Дата</TableCell>
              <TableCell align="right">Сумма</TableCell>
              <TableCell align="right">Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <OrderRow key={item.created} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AccountPage;
