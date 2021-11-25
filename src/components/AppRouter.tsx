import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import ShopPage from "../pages/ShopPage";
import { RouteNames } from "../types/routeTypes";

const AppRouter = () => {
  const loggedIn = useAppSelector((state) => state.account.loggedIn);

  const router = useRoutes([
    { path: RouteNames.SHOP, element: <ShopPage /> },
    { path: RouteNames.CART, element: <CartPage /> },
    {
      path: RouteNames.LOGIN,
      element: loggedIn ? <Navigate to={RouteNames.SHOP} /> : <LoginPage />,
    },
    {
      path: RouteNames.ACCOUNT,
      element: loggedIn ? <AccountPage /> : <Navigate to={RouteNames.LOGIN} />,
    },
  ]);

  return router;
};

export default AppRouter;
