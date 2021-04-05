import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  IconButton,
  Box,
  Collapse,
  Chip,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green, blue, yellow } from "@material-ui/core/colors";

import { Order, OrderStatus } from "../types/ordersTypes";
import { normalizeOrderStatus, normalizeDate } from "../utils/normalizers";

interface Props {
  item: Order;
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row: React.FC<Props> = (props) => {
  const { item } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  function setChipColor(status: OrderStatus) {
    switch (status) {
      case OrderStatus.N:
        return {
          color: "#fff",
          backgroundColor: blue[600],
        };
      case OrderStatus.P:
        return {
          color: "#636363",
          backgroundColor: yellow[600],
        };
      case OrderStatus.C:
        return {
          color: "#fff",
          backgroundColor: green[600],
        };
      default:
        return {};
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {item.id}
        </TableCell>
        <TableCell align="right">{normalizeDate(item.created)}</TableCell>
        <TableCell align="right">{item.get_total_cost}</TableCell>
        <TableCell align="right">
          <Chip
            label={normalizeOrderStatus(item.status)}
            style={setChipColor(item.status)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Цена</TableCell>
                    <TableCell align="right">Количество</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.order_items.map((orderItem) => (
                    <TableRow key={orderItem.product.id}>
                      <TableCell component="th" scope="row">
                        {orderItem.product.name}
                      </TableCell>
                      <TableCell>{orderItem.price}</TableCell>
                      <TableCell align="right">{orderItem.quantity}</TableCell>
                      <TableCell align="right">{orderItem.get_cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
