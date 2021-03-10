import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";

import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import Navigation from "./components/Navigation";
import { persistor, store } from "./redux/store";
import history from "./core/history";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <div className={classes.root}>
            <nav>
              <Navigation />
            </nav>
            <main className={classes.content}>
              <Switch>
                <Route path="/" component={ShopPage} exact />
                <Route path="/cart" component={CartPage} />
                <Route path="/account" component={AccountPage} />
                <Route path="/login" component={LoginPage} />
              </Switch>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
