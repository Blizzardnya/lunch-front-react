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
  TablePagination,
} from "@material-ui/core";

import OrderRow from "../components/OrderRow";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchOrders } from "../redux/slices/ordersSlice";
import Loading from "../components/Loading";

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
  const ordersLoading = useAppSelector((state) => state.orders.isLoading);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <Loading isLoading={ordersLoading} />
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <OrderRow key={item.created} item={item} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default AccountPage;
