import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Collapse,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green, blue, yellow } from "@mui/material/colors";

import { Order, OrderStatus } from "../types/ordersTypes";
import { normalizeOrderStatus, normalizeDate } from "../utils/normalizers";

interface Props {
  item: Order;
}

function setChipColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.NEW:
      return {
        color: "#fff",
        backgroundColor: blue[600],
      };
    case OrderStatus.PROCESSED:
      return {
        color: "#636363",
        backgroundColor: yellow[600],
      };
    case OrderStatus.COMPLETE:
      return {
        color: "#fff",
        backgroundColor: green[600],
      };
    default:
      return {};
  }
}

const Row: React.FC<Props> = (props) => {
  const { item } = props;
  const [open, setOpen] = React.useState(false);

  const toggleRowExpand = () => setOpen((prevValue) => !prevValue);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={toggleRowExpand}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
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
    </>
  );
};

export default Row;
