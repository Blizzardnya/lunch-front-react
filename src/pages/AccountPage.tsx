import React, { useEffect } from "react";
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
  TablePagination,
  TableFooter,
} from "@mui/material";

import OrderRow from "../components/OrderRow";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchOrders } from "../redux/slices/ordersSlice";
import Loading from "../components/Loading";

const PREFIX = "AccountPage";

const classes = {
  table: `${PREFIX}-table`,
  container: `${PREFIX}-container`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.table}`]: {
    minWidth: 650,
  },

  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(8),
  },
}));

const rowsPerPageOpt = [5, 10, 20];

const AccountPage: React.FC = () => {
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
    dispatch<any>(fetchOrders());
  }, [dispatch]);

  return (
    <Root>
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOpt}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Root>
  );
};

export default AccountPage;
