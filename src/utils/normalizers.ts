import dayjs from "dayjs";

import { OrderStatus } from "../types/ordersTypes";

function normalizeOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.NEW:
      return "Новый";
    case OrderStatus.PROCESSED:
      return "В процессе";
    case OrderStatus.COMPLETE:
      return "Выполнен";
    default:
      return "Неизвестный статус";
  }
}

function normalizeDate(date: string) {
  return dayjs(date).format("DD-MM-YYYY HH:mm:ss");
}

export { normalizeOrderStatus, normalizeDate };
