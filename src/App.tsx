import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import Navigation from "./components/Navigation";
import { persistor, store } from "./redux/store";
import history from "./core/history";
import ScrollTop from "./components/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <SnackbarProvider maxSnack={3}>
            <div style={{ display: "flex" }}>
              <nav>
                <Navigation />
              </nav>
              <main style={{ flexGrow: 1, padding: 24 }}>
                <Switch>
                  <Route path="/" component={ShopPage} exact />
                  <Route path="/cart" component={CartPage} />
                  <Route path="/account" component={AccountPage} />
                  <Route path="/login" component={LoginPage} />
                </Switch>
                <ScrollTop>
                  <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                  >
                    <KeyboardArrowUpIcon />
                  </Fab>
                </ScrollTop>
              </main>
            </div>
          </SnackbarProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
