import dayjs from "dayjs";

import { OrderStatus } from "../types/ordersTypes";

function normalizeOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.N:
      return "Новый";
    case OrderStatus.P:
      return "В процессе";
    case OrderStatus.C:
      return "Выполнен";
    default:
      return "Неизвестный статус";
  }
}

function normalizeDate(date: string) {
  return dayjs(date).format("DD-MM-YYYY HH:mm:ss");
}

export { normalizeOrderStatus, normalizeDate };
