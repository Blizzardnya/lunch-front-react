import { normalizeDate, normalizeOrderStatus } from "../normalizers";
import { OrderStatus } from "../../types/ordersTypes";

test("Normalize date", () => {
  const value = "2021-03-31T15:43:21.508195+03:00";

  expect(normalizeDate(value)).toBe("31-03-2021 15:43:21");
});

test("Normalize order status", () => {
  expect(normalizeOrderStatus(OrderStatus.COMPLETE)).toBe("Выполнен");
  expect(normalizeOrderStatus(OrderStatus.NEW)).toBe("Новый");
  expect(normalizeOrderStatus(OrderStatus.PROCESSED)).toBe("В процессе");
  expect(normalizeOrderStatus("U" as OrderStatus)).toBe("Неизвестный статус");
});
