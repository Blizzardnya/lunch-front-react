import { RouteNames } from "../types/routeTypes";

export function getAppBarTitle(pathname: string) {
  switch (pathname) {
    case RouteNames.SHOP:
      return "Магазин";
    case RouteNames.CART:
      return "Корзина";
    case RouteNames.ACCOUNT:
      return "Аккаунт";
    case RouteNames.LOGIN:
      return "Авторизация";
    default:
      return "";
  }
}
